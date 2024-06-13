import { computed, ref } from "vue";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { navigateToComponent, navigateToPreviousComponent } = uiState;
const { selectPlaceById } = useSelectedPlace();

const searchedPlaces = ref([]);

function setSearchedPlaces(newSearchedPlaces) {
  searchedPlaces.value = newSearchedPlaces;
  navigateToComponent(COMPONENT_NAMES.SEARCHING_VIEW);
}

async function selectPlace(index) {
  await selectPlaceById(searchedPlaces.value[index].placeId).then(() => {
    // 최근 검색어로 저장
    // updateSearchHistory({
    //   placeId: suggestions.value[index].placeId,
    //   name: suggestions.value[index].name,
    //   description: suggestions.value[index].description,
    // });

    navigateToPreviousComponent();
  });
}

export default function useSearching() {
  return {
    searchedPlaces: computed(() => searchedPlaces.value),
    setSearchedPlaces,
    selectPlace,
  };
}
