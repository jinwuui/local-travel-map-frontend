import { reactive, computed } from "vue";

export const COMPONENT_NAMES = {
  DEFAULT_VIEW: "DefaultView",
  NEW_PLACE_FORM: "NewPlaceForm",
  PLACE_DETAIL_VIEW: "PlaceDetailView",
  ANNOUNCEMENT_VIEW: "AnnouncementView",
  FEEDBACK_FORM: "FeedbackForm",
  SEARCHING_VIEW: "SearchingView",
  FAVORITE_VIEW: "FavoriteView",
};

const state = reactive({
  isMapFetchLoading: false,

  isLoginFormOpen: false,

  isSideTabOpen: false,
  isSideTabLoading: false,

  sideTabStack: [COMPONENT_NAMES.DEFAULT_VIEW],
});

function toggleMapFetchLoading() {
  state.isMapFetchLoading = !state.isMapFetchLoading;
}

function toggleLoginForm() {
  state.isLoginFormOpen = !state.isLoginFormOpen;
}

function toggleSideTab() {
  state.isSideTabOpen = !state.isSideTabOpen;
}

function toggleSideTabLoading() {
  state.isSideTabLoading = !state.isSideTabLoading;
}

function navigateToComponent(componentName) {
  if (!state.isSideTabOpen) toggleSideTab();
  state.sideTabStack.push(componentName);
}

function navigateToPreviousComponent() {
  if (state.sideTabStack.length > 1) {
    state.sideTabStack.pop();
  }
}

const uiState = {
  isMobile: computed(() => window.innerWidth <= 768),
  isMapFetchLoading: computed(() => state.isMapFetchLoading),
  toggleMapFetchLoading,

  isLoginFormOpen: computed(() => state.isLoginFormOpen),
  toggleLoginForm,

  isSideTabOpen: computed(() => state.isSideTabOpen),
  isSideTabLoading: computed(() => state.isSideTabLoading),
  toggleSideTab,
  toggleSideTabLoading,

  activeSideTab: computed(
    () => state.sideTabStack[state.sideTabStack.length - 1]
  ),
  navigateToComponent,
  navigateToPreviousComponent,
};

export default uiState;
