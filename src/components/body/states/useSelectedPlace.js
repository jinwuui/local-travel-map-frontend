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

async function selectPlace(place) {
  try {
    toggleSideTabLoading();

    const fetched = await placeAPI.fetchPlace(place.placeId);

    selectedPlace.value = PlaceDetail.fromPlace({
      place: place,
      description: fetched?.description || "기본 설명",
      rating: fetched?.rating || 0,
      images: fetched?.images,
      country: fetched?.country,
    });

    setMapCenter(selectedPlace.value.lat, selectedPlace.value.lng);
    setMapZoom(8);
    if (detailInfo.value) {
      detailInfo.value.scrollTop = 0;
    }

    navigateToComponent(COMPONENT_NAMES.PLACE_DETAIL_VIEW);
  } catch (error) {
    alert("여행지 불러오기 실패");
  } finally {
    toggleSideTabLoading();
  }
}

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
  } catch (error) {
    alert("여행지 불러오기 실패");
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
    !Array.isArray(selectedPlace.value.images) ||
    selectedPlace.value.images.length === 0
  ) {
    return;
  }

  imageSlider.isOpen = true;
  imageSlider.imageList = selectedPlace.value.images;
}

function closeSlider() {
  imageSlider.isOpen = false;
  imageSlider.index = 0;
}

export default function useSelectedPlace() {
  return {
    detailInfo,
    selectedPlace: computed(() => selectedPlace.value),
    selectPlace,
    selectPlaceById,

    toggleBookmarkPlace,

    imageSlider,
    openSlider,
    closeSlider,
  };
}
