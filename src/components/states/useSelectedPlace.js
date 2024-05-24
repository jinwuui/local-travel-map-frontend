import { reactive, computed } from "vue";
import PlaceDetail from "@/models/PlaceDetail";
import { placeAPI } from "@/services/place.api";

const selectedPlace = reactive({ value: null });

const selectPlace = async (place) => {
  const fetched = await placeAPI.fetchPlaceDetails(place.placeId);

  selectedPlace.value = PlaceDetail.fromPlace({
    place: place,
    description: fetched.placeDetails?.description || "기본 설명",
    rating: fetched.placeDetails?.rating || 0,
    photos: fetched.placeDetails?.photos,
  });
};

const selectPlaceById = async (placeId) => {
  const fetched = await placeAPI.fetchPlace(placeId);

  selectedPlace.value = PlaceDetail.fromJson(fetched.place);
};

export default function useSelectedPlace() {
  console.log("func - - - useSelectedPlace");
  return {
    selectedPlace: computed(() => selectedPlace.value),
    selectPlace,
    selectPlaceById,
  };
}
