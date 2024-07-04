import { ref, computed } from "vue";

import { communicationAPI } from "@/services/communication.api";
import { placeAPI } from "@/services/place.api";

import uiState from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const { navigateToPreviousComponent, toggleSideTabLoading } = uiState;

const { loadUser } = useApp();

const favoritePlaces = ref([]);

const announcements = ref([]);

const feedbackContent = ref("");
const feedbackWriter = ref("");

async function fetchFavoritePlaces() {
  const user = loadUser();
  if (!user) {
    throw Error("유저가 없습니다.");
  }

  try {
    toggleSideTabLoading();

    const { places } = await placeAPI.fetchFavoritePlaces(user.userId);
    favoritePlaces.value = places;
  } catch (error) {
    alert("즐겨찾기를 불러오는데 실패했습니다.");
  } finally {
    toggleSideTabLoading();
  }
}

async function fetchAnnouncements() {
  try {
    toggleSideTabLoading();

    const fetched = await communicationAPI.fetchAnnouncements();
    announcements.value = fetched.announcements;
  } catch (error) {
    alert("공지를 불러오는데 실패했습니다.");
  } finally {
    toggleSideTabLoading();
  }
}

function setFeedbackContent(event) {
  feedbackContent.value = event.target.value;
}

function setFeedbackWriter(event) {
  feedbackWriter.value = event.target.value;
}

async function submitFeedback() {
  if (!feedbackContent.value) {
    throw Error("건의할 내용을 입력해주세요");
  }

  try {
    toggleSideTabLoading();

    await communicationAPI
      .submitFeedback({
        content: feedbackContent.value,
        writer: feedbackWriter.value,
      })
      .then(() => {
        navigateToPreviousComponent();
      });
  } catch (error) {
    alert("건의하기가 실패했습니다.");
  } finally {
    toggleSideTabLoading();
  }
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
