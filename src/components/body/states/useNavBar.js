import { ref, computed } from "vue";
import { useToast, POSITION } from "vue-toastification";

import { communicationAPI } from "@/services/communication.api";
import { placeAPI } from "@/services/place.api";

import uiState from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const toast = useToast();

const { navigateToPreviousComponent } = uiState;

const { loadUser } = useApp();

const favoritePlaces = ref([]);

const announcements = ref([]);

const feedbackContent = ref("");
const feedbackWriter = ref("");

async function fetchFavoritePlaces() {
  const user = loadUser();
  if (!user) {
    toast.error("로그인이 필요합니다", {
      position: POSITION.TOP_CENTER,
      timeout: 2000,
    });
    return;
  }

  const { places } = await placeAPI.fetchFavoritePlaces(user.userId);
  favoritePlaces.value = places;
}

async function fetchAnnouncements() {
  const fetched = await communicationAPI.fetchAnnouncements();
  announcements.value = fetched.announcements;
}

function setFeedbackContent(event) {
  feedbackContent.value = event.target.value;
}

function setFeedbackWriter(event) {
  feedbackWriter.value = event.target.value;
}

async function submitFeedback() {
  if (!feedbackContent.value) {
    toast.error("건의할 내용을 입력해주세요", {
      position: POSITION.TOP_LEFT,
      timeout: 2000,
    });
    return;
  }

  await communicationAPI
    .submitFeedback({
      content: feedbackContent.value,
      writer: feedbackWriter.value,
    })
    .then(() => {
      toast.success("피드백 감사합니다!", {
        position: POSITION.TOP_LEFT,
        timeout: 2000,
      });

      navigateToPreviousComponent();
    });
}

export default function useNavBar() {
  return {
    favoritePlaces: computed(() => favoritePlaces.value),
    fetchFavoritePlaces,

    announcements: computed(() => announcements.value),
    fetchAnnouncements,

    feedbackContent: computed(() => feedbackContent.value),
    feedbackWriter: computed(() => feedbackWriter.value),
    setFeedbackContent,
    setFeedbackWriter,
    submitFeedback,
  };
}
