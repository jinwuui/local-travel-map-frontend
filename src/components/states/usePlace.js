import { ref, computed, reactive, watch } from "vue";
import PlaceMarker from "@/models/PlaceMarker";
import { placeAPI } from "@/services/place.api";

import useSelectedPlace from "@/components/states/useSelectedPlace";
// import PlaceMarker from "@/models/PlaceMarker";

// export default function usePlace() {
//   const loading = ref(false);
//   const places = ref([]);

//   async function fetch(params) {
//     loading.value = true;
//     const result = await placeAPI.fetchPlaceMarkers(params);
//     console.log("result", result);
//     for (const place of result.places) {
//       //   places.value.push(new PlaceMarker(place));
//       places.value.push(place);
//     }
//     // places.value = [...places.value, result.places];

//     console.log(places.value);
//     loading.value = false;
//   }
//   return {
//     loading: computed(() => loading.value),
//     places: computed(() => places.value),
//     fetch,
//   };
// }

const loading = ref(false);
const state = reactive({ places: [] });

async function fetch(params) {
  loading.value = true;

  const fetched = await placeAPI.fetchPlaceMarkers(params);

  const existed = new Set(state.places.map((item) => item.placeId));

  fetched.places.forEach((newItem) => {
    if (!existed.has(newItem.placeId)) {
      state.places.push(new PlaceMarker(newItem));
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
