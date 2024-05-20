import { reactive, computed } from "vue";
import PlaceDetail from "@/models/PlaceDetail";
import { placeAPI } from "@/services/place.api";

const selectedPlace = reactive({ value: null });

const selectPlace = async (place) => {
  const placeDetail = await placeAPI.fetchPlaceDetails(place.placeId);

  selectedPlace.value = PlaceDetail.fromPlace({
    place: place,
    description: placeDetail.placeDetails?.description || "기본 설명",
    rating: placeDetail.placeDetails?.rating || 0,
  });
};

export default function useSelectedPlace() {
  console.log("func - - - useSelectedPlace");
  return {
    selectedPlace: computed(() => selectedPlace.value),
    selectPlace,
  };
}
