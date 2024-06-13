import { reactive, computed } from "vue";
import { placeAPI } from "@/services/place.api";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import PlaceDetail from "@/models/PlaceDetail";

const { navigateToComponent } = uiState;
const { setMapCenter } = useMap();

const selectedPlace = reactive({ value: null });
const imageSlider = reactive({ imageList: [], isOpen: false });

async function selectPlace(place) {
  const fetched = await placeAPI.fetchPlaceDetails(place.placeId);

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
  const fetched = await placeAPI.fetchPlace(placeId);

  selectedPlace.value = PlaceDetail.fromJson(fetched.place);

  setMapCenter(selectedPlace.value.lat, selectedPlace.value.lng);
  navigateToComponent(COMPONENT_NAMES.PLACE_DETAIL_VIEW);
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

    imageSlider,
    openSlider,
    closeSlider,
  };
}
