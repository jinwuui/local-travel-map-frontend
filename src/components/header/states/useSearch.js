import { computed, ref } from "vue";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import { searchAPI } from "@/services/search.api";

import useSelectedPlace from "@/components/body/states/useSelectedPlace";
import useSearching from "@/components/body/states/useSearching";
import { debounce } from "@/utils/commonUtils";

const { navigateToComponent, toggleSideTabLoading } = uiState;

const { selectPlaceById } = useSelectedPlace();
const { setSearchedPlaces } = useSearching();

const suggestions = ref([]);

const searchHistory = ref([]);

const selectedIndex = ref(-1);

const inputText = ref(null);
const inputRef = ref(null);

const tempQuery = ref(null);

const lastQuery = ref(null);
const lastSuggestions = ref(null);

const debounceAutocomplete = debounce(autocomplete, 400);

function setInputText(value) {
  inputText.value = value;
}

async function autocomplete(query) {
  if (document.activeElement !== inputRef.value) {
    return;
  }
  if (query == null || query === "") {
    clearSuggestions();
    suggestions.value = searchHistory.value;
    return;
  }

  const trimmedQuery = query.trim();
  if (trimmedQuery.length == 0) return;
  if (trimmedQuery === lastQuery.value) {
    // TODO: focus를 잃었다가 찾으면 api 보내지 않고 이전 기록 바로 보여주기
    suggestions.value = lastSuggestions.value;
    return;
  }
  if (
    // TODO: 검색 결과가 없는 상태에선 더 입력해도 검색 결과 없음
    trimmedQuery.startsWith(lastQuery.value) &&
    lastSuggestions.value.length === 0
  ) {
    return;
  }

  const data = await searchAPI.autocomplete(trimmedQuery);
  const newIdSet = new Set(data.suggestions.map((item) => item.placeId));

  const recentSuggestions = searchHistory.value
    .filter((item) => {
      if (newIdSet.has(item.placeId)) {
        newIdSet.delete(item.placeId);
        return true;
      }
      return false;
    })
    .map((item) => ({ ...item, type: "recent" }));

  const newSuggestions = data.suggestions
    .filter((item) => newIdSet.has(item.placeId))
    .map((item) => ({ ...item, type: "auto" }));

  suggestions.value = [...recentSuggestions, ...newSuggestions];

  selectedIndex.value = -1;
  lastQuery.value = trimmedQuery;
  lastSuggestions.value = suggestions.value;
}

function clearSuggestions() {
  suggestions.value = [];
  selectedIndex.value = -1;
}

function setSelectedIndex(newSelectedIndex) {
  if (selectedIndex.value === -1) {
    tempQuery.value = inputText.value;
  }

  const len = suggestions.value.length;
  if (newSelectedIndex > len - 1) {
    newSelectedIndex = -1;
  }
  if (newSelectedIndex < -1) {
    newSelectedIndex = len - 1;
  }

  selectedIndex.value = newSelectedIndex;

  if (selectedIndex.value === -1) {
    inputText.value = tempQuery.value;
  } else {
    inputText.value = suggestions.value[selectedIndex.value].name;
  }
}

async function searching() {
  const index = selectedIndex.value;
  const query = inputText.value?.trim() || "";
  if (!query) {
    return;
  }

  inputRef.value?.blur();

  const trimmedQuery = query.trim();

  if (index === -1) {
    try {
      toggleSideTabLoading();
      navigateToComponent(COMPONENT_NAMES.SEARCHING_VIEW);

      if (lastQuery.value === trimmedQuery) {
        setSearchedPlaces(lastSuggestions.value);
      } else {
        await searchAPI.autocomplete(trimmedQuery).then((data) => {
          setSearchedPlaces(data.suggestions);
        });
      }
    } finally {
      toggleSideTabLoading();
    }
  } else {
    selectSuggestion(index);
  }

  clearSuggestions();
}

async function selectSuggestion(index) {
  const place = suggestions.value[index];
  if (!place) {
    return;
  }

  // 상세 정보창 업데이트
  await selectPlaceById(place.placeId).then(() => {
    // 최근 검색어로 저장
    updateSearchHistory({
      placeId: place.placeId,
      name: place.name,
      description: place.description,
      country: place.country,
    });
  });
}

function isEnableSearching() {
  return (
    -1 <= selectedIndex.value && selectedIndex.value < suggestions.value.length
  );
}

function updateSearchHistory({ placeId, name, description, country }) {
  searchHistory.value = searchHistory.value.filter(
    (search) => search.placeId !== placeId
  );
  searchHistory.value.unshift({
    placeId,
    name,
    description,
    country,
    type: "recent",
  });

  localStorage.setItem(
    "searchHistory",
    JSON.stringify(searchHistory.value.slice(0, 5))
  );
}

function loadSearchHistory() {
  const searches = localStorage.getItem("searchHistory");
  if (searches) {
    searchHistory.value = JSON.parse(searches);
  }
}

function deleteSearchHistory(index) {
  const suggestion = suggestions.value[index];
  suggestions.value.splice(index, 1);

  searchHistory.value = searchHistory.value.filter(
    (history) => history.placeId !== suggestion.placeId
  );

  localStorage.setItem(
    "searchHistory",
    JSON.stringify(searchHistory.value.slice(0, 5))
  );
}

export default function useSearch() {
  return {
    loadSearchHistory,
    deleteSearchHistory,

    inputText: computed(() => inputText.value),
    inputRef,
    setInputText,
    debounceAutocomplete,

    suggestions: computed(() => suggestions.value),
    clearSuggestions,
    lastSuggestions: computed(() => lastSuggestions.value),

    searching,
    isEnableSearching,

    selectedIndex: computed(() => selectedIndex.value),
    setSelectedIndex,
  };
}
