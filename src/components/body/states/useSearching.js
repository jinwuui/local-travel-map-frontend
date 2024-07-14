import { computed, ref } from "vue";

import uiState from "@/components/states/uiState";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { navigateToPreviousComponent } = uiState;
const { selectPlaceById } = useSelectedPlace();

const searchedPlaces = ref([]);

function setSearchedPlaces(newSearchedPlaces) {
  searchedPlaces.value = newSearchedPlaces;
}

async function selectPlace(index) {
  navigateToPreviousComponent();
  await selectPlaceById(searchedPlaces.value[index].placeId).then(() => {
    // 최근 검색어로 저장
    // updateSearchHistory({
    //   placeId: suggestions.value[index].placeId,
    //   name: suggestions.value[index].name,
    //   description: suggestions.value[index].description,
    // });
  });
}

export default function useSearching() {
  return {
    searchedPlaces: computed(() => searchedPlaces.value),
    setSearchedPlaces,
    selectPlace,
  };
}
