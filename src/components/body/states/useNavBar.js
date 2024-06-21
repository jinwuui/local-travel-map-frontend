import { ref, computed } from "vue";
import { communicationAPI } from "@/services/communication.api";
import { placeAPI } from "@/services/place.api";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const { navigateToComponent } = uiState;
const { loadUser } = useApp();

const favoritePlaces = ref([]);

const feedback = ref("");

async function fetchFavoritePlaces() {
  const user = loadUser();
  if (!user) {
    alert("로그인이 필요합니다");
    return;
  }

  const { places } = await placeAPI.fetchFavoritePlaces(user.userId);
  favoritePlaces.value = places;
}

async function fetchAnnouncements() {
  await communicationAPI.fetchAnnouncements();
  navigateToComponent(COMPONENT_NAMES.ANNOUNCEMENT_VIEW);
}

async function submitFeedback() {
  await communicationAPI.submitFeedback();
  navigateToComponent(COMPONENT_NAMES.FEEDBACK_FORM);
}

export default function useNavBar() {
  return {
    favoritePlaces: computed(() => favoritePlaces.value),
    fetchFavoritePlaces,

    fetchAnnouncements,

    feedback: computed(() => feedback.value),
    submitFeedback,
  };
}
