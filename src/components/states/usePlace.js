import { ref, computed, reactive, watch } from "vue";
import Place from "@/models/Place";
import { placeAPI } from "@/services/place.api";

import useSelectedPlace from "@/components/states/useSelectedPlace";

const loading = ref(false);
const places = reactive({ value: [] });

async function fetch(params) {
  console.log("-- fetch start", places.value);
  loading.value = true;

  const fetched = await placeAPI.fetchPlaces(params);

  const existed = new Set(places.value.map((item) => item.placeId));

  fetched.places?.forEach((newItem) => {
    if (!existed.has(newItem.placeId)) {
      places.value.push(new Place(newItem));
      existed.add(newItem.placeId); // Set에 새로운 id 추가
    }
  });

  console.log("-- fetched", places.value);
  loading.value = false;
}

function addPlaceOnMap(newPlace) {
  loading.value = true;
  places.value.push(new Place(newPlace));
  loading.value = false;
}

const { selectedPlace } = useSelectedPlace();

watch(selectedPlace, (newSelectedPlace) => {
  console.log("     watch - selected place:", newSelectedPlace.placeId);

  places.value = places.value.map((place) =>
    place.placeId === newSelectedPlace.placeId ? newSelectedPlace : place
  );
  console.log("     watch  - ", places.value);
});

export default function usePlace() {
  return {
    loading: computed(() => loading.value),
    places: computed(() => places.value),
    fetch,
    addPlaceOnMap,
  };
}
