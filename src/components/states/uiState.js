import { reactive, computed } from "vue";

const state = reactive({
  isMapFetchLoading: false,

  isSideTabOpen: false,

  isNewPlaceFormOpen: false,
  isNewPlaceLoading: false,

  isPlaceDetailOpen: false,
  isPlaceDetailLoading: false,
});

const toggleMapFetchLoading = () => {
  state.isMapFetchLoading = !state.isMapFetchLoading;
};

const toggleSideTab = () => {
  state.isSideTabOpen = !state.isSideTabOpen;
};

const toggleNewPlaceForm = () => {
  if (!state.isNewPlaceFormOpen && !state.isSideTabOpen) toggleSideTab();
  state.isNewPlaceFormOpen = !state.isNewPlaceFormOpen;
};

const toggleNewPlaceLoading = () => {
  state.isNewPlaceLoading = !state.isNewPlaceLoading;
};

const openPlaceDetail = () => {
  if (!state.isSideTabOpen) toggleSideTab();
  if (state.isNewPlaceFormOpen) toggleNewPlaceForm();
  state.isPlaceDetailOpen = true;
};

const togglePlaceDetailLoading = () => {
  state.isPlaceDetailLoading = !state.isPlaceDetailLoading;
};

const uiState = {
  isMapFetchLoading: computed(() => state.isMapFetchLoading),
  isSideTabOpen: computed(() => state.isSideTabOpen),
  isNewPlaceFormOpen: computed(() => state.isNewPlaceFormOpen),
  isNewPlaceLoading: computed(() => state.isNewPlaceLoading),
  isPlaceDetailOpen: computed(() => state.isPlaceDetailOpen),
  isPlaceDetailLoading: computed(() => state.isPlaceDetailLoading),
  toggleMapFetchLoading,
  toggleSideTab,
  toggleNewPlaceForm,
  toggleNewPlaceLoading,
  openPlaceDetail,
  togglePlaceDetailLoading,
};

export default uiState;
