import { ref, computed, watch } from "vue";
import Place from "@/models/Place";
import { placeAPI } from "@/services/place.api";

import useSelectedPlace from "@/components/states/useSelectedPlace";
import uiState from "@/components/states/uiState";

const { toggleMapFetchLoading } = uiState;
const places = ref([]);

async function fetch(params) {
  console.log("-- fetch: params=", params);
  toggleMapFetchLoading();

  const fetched = await placeAPI.fetchPlaces(params);

  if (params) {
    places.value = fetched.places?.map((item) => new Place(item));
  } else {
    const existed = new Set(places.value.map((item) => item.placeId));

    fetched.places?.forEach((newItem) => {
      if (!existed.has(newItem.placeId)) {
        places.value.push(new Place(newItem));
        existed.add(newItem.placeId); // Set에 새로운 id 추가
      }
    });
  }

  console.log("-- fetched", places.value);
  toggleMapFetchLoading();
}

function addPlaceOnMap(newPlace) {
  toggleMapFetchLoading();
  places.value.push(new Place(newPlace));
  toggleMapFetchLoading();
}

const { selectedPlace } = useSelectedPlace();

watch(selectedPlace, (newSelectedPlace) => {
  const index = places.value.findIndex(
    (place) => place.placeId === newSelectedPlace.placeId
  );

  if (index !== -1) {
    places.value[index] = newSelectedPlace;
  } else {
    places.value.push(newSelectedPlace);
  }
});

export default function usePlace() {
  return {
    places: computed(() => places.value),
    fetch,
    addPlaceOnMap,
  };
}
