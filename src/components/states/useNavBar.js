import { ref, computed } from "vue";
import { communicationAPI } from "@/services/communication.api";

import uiState from "@/components/states/uiState";

const { toggleAnnouncementsWindow, toggleFeedbackWindow } = uiState;

const feedback = ref("");

async function fetchAnnouncements() {
  await communicationAPI.fetchAnnouncements();
  toggleAnnouncementsWindow();
}

async function submitFeedback() {
  await communicationAPI.submitFeedback();
  toggleFeedbackWindow();
}

export default function useNavBar() {
  return {
    fetchAnnouncements,

    feedback: computed(() => feedback.value),
    submitFeedback,
  };
}
