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
  loginNextAction: null,

  isSideTabOpen: false,
  isSideTabLoading: false,

  sideTabStack: [COMPONENT_NAMES.DEFAULT_VIEW],
});

function toggleMapFetchLoading() {
  state.isMapFetchLoading = !state.isMapFetchLoading;
}

function toggleLoginForm(nextAction = null) {
  state.isLoginFormOpen = !state.isLoginFormOpen;
  if (state.isLoginFormOpen) {
    state.loginNextAction = nextAction;
  }
}

function executeLoginNextAction() {
  if (state.loginNextAction) {
    state.loginNextAction();
    state.loginNextAction = null;
  }
}

function toggleSideTab() {
  state.isSideTabOpen = !state.isSideTabOpen;
}

function toggleSideTabLoading() {
  state.isSideTabLoading = !state.isSideTabLoading;
}

function navigateToComponent(componentName) {
  if (!state.isSideTabOpen) toggleSideTab();

  const index = state.sideTabStack.indexOf(componentName);
  if (index !== -1) {
    state.sideTabStack.splice(index, 1);
  }

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
  executeLoginNextAction,

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
