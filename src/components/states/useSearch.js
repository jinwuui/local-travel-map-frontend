import { reactive, computed, ref } from "vue";
import { searchAPI } from "@/services/search.api";
import useSelectedPlace from "@/components/states/useSelectedPlace";
import useMap from "@/components/states/useMap";

const { selectPlaceById, selectedPlace } = useSelectedPlace();
const { setMapCenter } = useMap();

const suggestions = reactive({ value: [] });
const selectedIndex = ref(-1);

const inputText = ref(null);
const tempQuery = ref(null);

function setInputText(value) {
  inputText.value = value;
}

async function autocomplete(query) {
  console.log("    autocomplete");
  if (query == null || query === "") {
    // TODO: 최근 검색 기록 보여주기
    clearSuggestions();
    return;
  }

  // TODO: focus를 잃었다가 찾으면 api 보내지 말고 이전 기록 바로 보여주기
  const trimmedQuery = query.trim();
  if (trimmedQuery.length == 0) return;

  const data = await searchAPI.autocomplete(trimmedQuery);
  suggestions.value = data.suggestions;
  selectedIndex.value = -1;
}

function clearSuggestions() {
  console.log("    clearSuggestions");
  suggestions.value = [];
  selectedIndex.value = -1;
}

function setSelectedIndex(newSelectedIndex) {
  console.log("    setSelected", newSelectedIndex);
  if (selectedIndex.value === -1) {
    tempQuery.value = inputText.value;
  }

  if (newSelectedIndex > suggestions.value.length - 1) {
    newSelectedIndex = -1;
  }
  if (newSelectedIndex < -1) {
    newSelectedIndex = suggestions.value.length - 1;
  }

  selectedIndex.value = newSelectedIndex;

  if (selectedIndex.value === -1) {
    inputText.value = tempQuery.value;
  } else {
    inputText.value = suggestions.value[selectedIndex.value].name;
  }
}

async function selectSuggestion(index) {
  console.log("    select", index);

  // 상세 정보창 업데이트
  await selectPlaceById(suggestions.value[index].placeId);

  // 지도 중심 이동
  setMapCenter(selectedPlace.value.lat, selectedPlace.value.lng);
}

function isEnableEnter() {
  return (
    -1 < selectedIndex.value && selectedIndex.value < suggestions.value.length
  );
}

export default function useSearch() {
  return {
    inputText,
    setInputText,
    autocomplete,

    suggestions: computed(() => suggestions.value),
    clearSuggestions,
    selectSuggestion,

    selectedIndex: computed(() => selectedIndex.value),
    setSelectedIndex,
    isEnableEnter,
  };
}
