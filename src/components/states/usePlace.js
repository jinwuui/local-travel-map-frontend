import { ref, computed, watch } from "vue";
import Place from "@/models/Place";
import { placeAPI } from "@/services/place.api";

import useMap from "@/components/states/useMap";
import useApp from "@/components/states/useApp";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";
import uiState from "@/components/states/uiState";

const { toggleMapFetchLoading } = uiState;
const { loadUser } = useApp();
const { mapRef } = useMap();

const places = ref([]);
const renderCluster = ref(false);

watch(places.value, (newPlaces) => {
  if (mapRef.value?.ready && newPlaces) {
    setTimeout(() => {
      renderCluster.value = true;
    }, 400);
  }
});

async function fetchPlaces(params) {
  try {
    toggleMapFetchLoading();

    const fetchedData = await placeAPI.fetchPlaces(params, loadUser()?.userId);

    if (params) {
      updatePlacesWithParams(fetchedData.places);
    } else {
      updatePlacesWithoutParams(fetchedData.places);
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  } finally {
    toggleMapFetchLoading();
  }
}

function updatePlacesWithParams(fetchedPlaces) {
  places.value = fetchedPlaces?.map((item) => new Place(item)) || [];
}

function updatePlacesWithoutParams(fetchedPlaces) {
  const existingPlaceIds = new Set(places.value.map((item) => item.placeId));

  fetchedPlaces?.forEach((newItem) => {
    if (!existingPlaceIds.has(newItem.placeId)) {
      places.value.push(new Place(newItem));
      existingPlaceIds.add(newItem.placeId);
    }
  });
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
    renderCluster: computed(() => renderCluster.value),
    fetchPlaces,
  };
}
