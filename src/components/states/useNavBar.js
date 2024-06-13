import { ref, computed } from "vue";
import { communicationAPI } from "@/services/communication.api";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";

const { navigateToComponent } = uiState;

const feedback = ref("");

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
    fetchAnnouncements,

    feedback: computed(() => feedback.value),
    submitFeedback,
  };
}
