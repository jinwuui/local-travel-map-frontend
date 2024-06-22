import { reactive, computed } from "vue";
import { placeAPI } from "@/services/place.api";
import { userAPI } from "@/services/user.api";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import useApp from "@/components/states/useApp";
import PlaceDetail from "@/models/PlaceDetail";

const { navigateToComponent } = uiState;
const { setMapCenter } = useMap();
const { user, loadUser } = useApp();

const selectedPlace = reactive({ value: null });
const imageSlider = reactive({ imageList: [], isOpen: false });

async function selectPlace(place) {
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
  navigateToComponent(COMPONENT_NAMES.PLACE_DETAIL_VIEW);
}

async function selectPlaceById(placeId) {
  const fetched = await placeAPI.fetchPlace(placeId, loadUser()?.userId);

  selectedPlace.value = PlaceDetail.fromJson(fetched.place);

  setMapCenter(selectedPlace.value.lat, selectedPlace.value.lng);
  navigateToComponent(COMPONENT_NAMES.PLACE_DETAIL_VIEW);
}

async function toggleFavoritePlace() {
  if (!user.value) return;

  const { isFavorite } = await userAPI.toggleFavoritePlace(
    user.value.userId,
    selectedPlace.value.placeId
  );

  selectedPlace.value.isFavorite = isFavorite;
  console.log("isFavorite", isFavorite);
}

function openSlider() {
  console.log("show slider");
  imageSlider.imageList = selectedPlace.value.photos;
  if (imageSlider.imageList.length > 0) imageSlider.isOpen = true;
}
function closeSlider() {
  console.log("close slider");
  imageSlider.isOpen = false;
}

export default function useSelectedPlace() {
  return {
    selectedPlace: computed(() => selectedPlace.value),
    selectPlace,
    selectPlaceById,

    toggleFavoritePlace,

    imageSlider,
    openSlider,
    closeSlider,
  };
}
