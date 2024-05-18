import { ref, computed, reactive, watch } from "vue";
import Place from "@/models/Place";
import { placeAPI } from "@/services/place.api";

import useSelectedPlace from "@/components/states/useSelectedPlace";

const loading = ref(false);
const state = reactive({ places: [] });

async function fetch(params) {
  loading.value = true;

  const fetched = await placeAPI.fetchPlaces(params);

  const existed = new Set(state.places.map((item) => item.placeId));

  fetched.places?.forEach((newItem) => {
    if (!existed.has(newItem.placeId)) {
      state.places.push(new Place(newItem));
      existed.add(newItem.placeId); // Set에 새로운 id 추가
    }
  });

  console.log("-- fetched", state.places);
  loading.value = false;
}

const { selectedPlace } = useSelectedPlace();

watch(selectedPlace, (newSelectedPlace) => {
  console.log("     watch - selected place:", newSelectedPlace.placeId);

  state.places = state.places.map((place) =>
    place.placeId === newSelectedPlace.placeId ? newSelectedPlace : place
  );
  console.log("     watch  - ", state.places);
});

export default function usePlace() {
  console.log("func - - - usePlace");
  return {
    loading: computed(() => loading.value),
    places: computed(() => state.places),
    fetch,
  };
}
