import { ref, reactive, computed, watch } from "vue";
import { placeAPI } from "@/services/place.api";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import useApp from "@/components/states/useApp";
import PlaceDetail from "@/models/PlaceDetail";

const { navigateToComponent, toggleSideTabLoading } = uiState;
const { setMapCenter, setMapZoom } = useMap();
const { user } = useApp();

const detailInfo = ref(null);
const selectedPlace = ref(null);

const imageSlider = reactive({ imageList: [], index: 0, isOpen: false });

const isLoading = ref(true);
const pollingInterval = ref(null);
const imageUrl = ref("");

async function selectPlaceById(placeId) {
  try {
    toggleSideTabLoading();

    const fetched = await placeAPI.fetchPlace(placeId).then((result) => {
      result.lat = parseFloat(result.lat);
      result.lng = parseFloat(result.lng);
      return result;
    });

    selectedPlace.value = PlaceDetail.fromJson(fetched);

    setMapCenter(selectedPlace.value.lat, selectedPlace.value.lng);
    setMapZoom(8);
    if (detailInfo.value) {
      detailInfo.value.scrollTop = 0;
    }

    navigateToComponent(COMPONENT_NAMES.PLACE_DETAIL_VIEW);
  } catch (e) {
    alert("여행지 불러오기 실패");
    console.error("Error - 여행지 불러오기 실패:", e);
  } finally {
    toggleSideTabLoading();
  }
}

async function toggleBookmarkPlace() {
  if (!user.value) return;

  const { isBookmarked } = await placeAPI.toggleBookmarkPlace(
    selectedPlace.value.placeId
  );

  selectedPlace.value.isBookmarked = isBookmarked;
}

function openSlider() {
  if (
    !Array.isArray(selectedPlace.value.imageUrls) ||
    selectedPlace.value.imageUrls.length === 0
  ) {
    return;
  }

  imageSlider.isOpen = true;
  imageSlider.imageList = selectedPlace.value.imageUrls;
}

function closeSlider() {
  imageSlider.isOpen = false;
  imageSlider.index = 0;
}

// 이미지 로드 체크 함수
const checkImageStatus = async () => {
  const img = new Image();

  img.onload = () => {
    isLoading.value = false; // 이미지가 로드되면 로딩 상태 종료
    clearInterval(pollingInterval.value); // Polling 중단
    pollingInterval.value = null;
    imageUrl.value = selectedPlace.value.imageUrls[0].resizedImageUrl_t; // 리사이징된 이미지 사용
  };
  img.onerror = () => {
    console.info("이미지 로딩 중");
  };

  img.src = selectedPlace.value.imageUrls[0].resizedImageUrl_t;
};

// Polling 시작 함수
const startPolling = () => {
  if (!pollingInterval.value) {
    checkImageStatus();
    pollingInterval.value = setInterval(checkImageStatus, 2000); // 2초마다 이미지 상태 확인
  }
};

// 컴포넌트 생성 시 Polling 시작
watch(
  () => selectedPlace.value,
  () => {
    if (selectedPlace.value.imageUrls.length === 0) {
      imageUrl.value = process.env.VUE_APP_DEFAULT_IMAGE_URL;
      isLoading.value = false;
    } else {
      imageUrl.value = selectedPlace.value.imageUrls[0].resizedImageUrl_t;
      isLoading.value = true;
      startPolling();
    }
  }
);

export default function useSelectedPlace() {
  return {
    detailInfo,
    selectedPlace: computed(() => selectedPlace.value),
    selectPlaceById,

    toggleBookmarkPlace,

    imageSlider,
    openSlider,
    closeSlider,

    isLoading: computed(() => isLoading.value),
    imageUrl: computed(() => imageUrl.value),
  };
}
