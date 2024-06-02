import { reactive, computed } from "vue";

const state = reactive({
  isMapFetchLoading: false,

  isSideTabOpen: false,

  isNewPlaceFormOpen: false,
  isNewPlaceLoading: false,

  isPlaceDetailOpen: false,
  isPlaceDetailLoading: false,
});

function toggleMapFetchLoading() {
  state.isMapFetchLoading = !state.isMapFetchLoading;
}

function toggleSideTab() {
  state.isSideTabOpen = !state.isSideTabOpen;
}

function toggleNewPlaceForm() {
  if (!state.isNewPlaceFormOpen && !state.isSideTabOpen) toggleSideTab();
  state.isNewPlaceFormOpen = !state.isNewPlaceFormOpen;
}

function toggleNewPlaceLoading() {
  state.isNewPlaceLoading = !state.isNewPlaceLoading;
}

function openPlaceDetail() {
  if (!state.isSideTabOpen) toggleSideTab();
  if (state.isNewPlaceFormOpen) toggleNewPlaceForm();
  state.isPlaceDetailOpen = true;
}

function togglePlaceDetailLoading() {
  state.isPlaceDetailLoading = !state.isPlaceDetailLoading;
}

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