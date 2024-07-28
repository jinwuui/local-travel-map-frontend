import { ref, reactive, computed } from "vue";
import { placeAPI } from "@/services/place.api";
import { userAPI } from "@/services/user.api";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import useApp from "@/components/states/useApp";
import PlaceDetail from "@/models/PlaceDetail";

const { navigateToComponent, toggleSideTabLoading } = uiState;
const { setMapCenter, setMapZoom } = useMap();
const { user, loadUser } = useApp();

const detailInfo = ref(null);
const selectedPlace = ref(null);
const imageSlider = reactive({ imageList: [], isOpen: false });

async function selectPlace(place) {
  try {
    toggleSideTabLoading();

    const fetched = await placeAPI.fetchPlaceDetails(
      place.placeId,
      loadUser()?.userId
    );

    selectedPlace.value = PlaceDetail.fromPlace({
      place: place,
      description: fetched.placeDetails?.description || "기본 설명",
      rating: fetched.placeDetails?.rating || 0,
      photos: fetched.placeDetails?.photos,
      country: fetched.placeDetails?.country,
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

    const fetched = await placeAPI.fetchPlace(placeId, loadUser()?.userId);

    selectedPlace.value = PlaceDetail.fromJson(fetched.place);

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

async function toggleFavoritePlace() {
  if (!user.value) return;

  const { isFavorite } = await userAPI.toggleFavoritePlace(
    user.value.userId,
    selectedPlace.value.placeId
  );

  selectedPlace.value.isFavorite = isFavorite;
}

function openSlider() {
  if (
    !Array.isArray(selectedPlace.value.photos) ||
    selectedPlace.value.photos.length === 0
  ) {
    return;
  }

  imageSlider.isOpen = true;
  imageSlider.imageList = selectedPlace.value.photos;
}

function closeSlider() {
  imageSlider.isOpen = false;
}

export default function useSelectedPlace() {
  return {
    detailInfo,
    selectedPlace: computed(() => selectedPlace.value),
    selectPlace,
    selectPlaceById,

    toggleFavoritePlace,

    imageSlider,
    openSlider,
    closeSlider,
  };
}
