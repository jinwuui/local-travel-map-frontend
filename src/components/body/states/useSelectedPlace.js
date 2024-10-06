import { ref, reactive, computed } from "vue";
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

export default function useSelectedPlace() {
  return {
    detailInfo,
    selectedPlace: computed(() => selectedPlace.value),
    selectPlaceById,

    toggleBookmarkPlace,

    imageSlider,
    openSlider,
    closeSlider,
  };
}
