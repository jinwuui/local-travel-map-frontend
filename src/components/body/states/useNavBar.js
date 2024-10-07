import { ref, computed } from "vue";

import { communicationAPI } from "@/services/communication.api";
import { placeAPI } from "@/services/place.api";

import uiState from "@/components/states/uiState";
import useApp from "@/components/states/useApp";
import PlaceDetail from "@/models/PlaceDetail";

const { navigateToPreviousComponent, toggleSideTabLoading } = uiState;

const { loadUser } = useApp();

const bookmarkPlaces = ref([]);

const announcements = ref([]);

const feedbackContent = ref("");
const feedbackWriter = ref("");

async function fetchBookmarkPlaces() {
  const user = loadUser();
  if (!user) {
    throw Error("유저가 없습니다.");
  }

  try {
    toggleSideTabLoading();

    const fetched = await placeAPI.fetchBookmarkPlaces();
    bookmarkPlaces.value =
      fetched.items.map((item) => new PlaceDetail(item)) || [];
  } catch (e) {
    alert("즐겨찾기를 불러오는데 실패했습니다.");
    console.error("Error 즐겨찾기 불러오기 실패:", e);
  } finally {
    toggleSideTabLoading();
  }
}

async function fetchAnnouncements() {
  try {
    toggleSideTabLoading();

    const fetched = await communicationAPI.fetchAnnouncements();
    announcements.value = fetched.items;
  } catch (e) {
    alert("공지를 불러오는데 실패했습니다.");
    console.error("Error 공지 불러오기 실패:", e);
  } finally {
    toggleSideTabLoading();
  }
}

function setFeedbackContent(newValue) {
  feedbackContent.value = newValue;
}

function setFeedbackWriter(newValue) {
  feedbackWriter.value = newValue;
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
  } catch (e) {
    alert("건의하기가 실패했습니다.");
    console.error("Error 건의하기 실패:", e);
  } finally {
    toggleSideTabLoading();
  }
}

export default function useNavBar() {
  return {
    bookmarkPlaces: computed(() => bookmarkPlaces.value),
    fetchBookmarkPlaces,

    announcements: computed(() => announcements.value),
    fetchAnnouncements,

    feedbackContent: computed(() => feedbackContent.value),
    feedbackWriter: computed(() => feedbackWriter.value),
    setFeedbackContent,
    setFeedbackWriter,
    submitFeedback,
  };
}
