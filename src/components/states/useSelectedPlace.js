import { reactive, computed } from "vue";
import Place from "@/models/Place";
import { placeAPI } from "@/services/place.api";

const selectedPlace = reactive({ value: null });

const selectPlace = async (marker) => {
  const placeDetails = await placeAPI.fetchPlaceDetails(marker.placeId);
  console.log("selectPlace", placeDetails, marker);

  selectedPlace.value = Place.fromMarkerAndDetails({
    marker: marker,
    name: placeDetails?.name ?? "default name",
    description: placeDetails?.description ?? "default description",
    rating: placeDetails?.rating ?? -1,
  });
};

export default function useSelectedPlace() {
  console.log("func - - - useSelectedPlace");
  return {
    selectedPlace: computed(() => selectedPlace.value),
    selectPlace,
  };
}

// export { selectedPlace, selectPlace };
