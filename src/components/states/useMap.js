import { googleMapsAPI } from "@/services/googleMaps.api";
import { computed, ref } from "vue";

const mapCenter = ref({ lat: 37.5642135, lng: 127.0016985 });
const mapZoom = ref(4);
const minZoom = ref(null);
const mapRef = ref(null);

const isClickedGooglePlace = ref(false);
const googlePlace = ref();

function setMapCenter(lat, lng) {
  mapCenter.value = { lat: lat, lng: lng };
}

function setMapZoom(newMapZoom) {
  mapZoom.value = newMapZoom;
}

function setMinZoom(newMinZoom) {
  minZoom.value = newMinZoom;
}

function getCenterOutsideSidetab() {
  if (!mapRef.value) return null;

  const gmap = mapRef.value.map;
  const center = gmap.getCenter();

  return { lat: center.lat(), lng: center.lng() };
}

async function handleClick(event) {
  if (event.placeId) {
    try {
      event.stop();

      const data = await googleMapsAPI.getPlaceDetails(event.placeId);
      isClickedGooglePlace.value = true;
      googlePlace.value = data;

      setMapCenter(
        googlePlace.value.location.latitude,
        googlePlace.value.location.longitude
      );
    } catch (error) {
      console.error("Error in import google place", error);
      throw error;
    }
  }
}

function closeImportWindow() {
  isClickedGooglePlace.value = false;
  googlePlace.value = null;
}

async function navigateToNewPlaceForm() {
  const useNewPlaceModule = await import(
    "@/components/body/states/useNewPlace"
  );
  const { openNewPlaceForm } = useNewPlaceModule.default();

  openNewPlaceForm({
    lat: googlePlace.value.location.latitude,
    lng: googlePlace.value.location.longitude,
    name: googlePlace.value.displayName.text,
    description: googlePlace.value.shortFormattedAddress,
  });

  closeImportWindow();
}

export default function useMap() {
  return {
    mapRef,
    mapCenter: computed(() => mapCenter.value),
    setMapCenter,
    mapZoom: computed(() => mapZoom.value),
    setMapZoom,
    minZoom: computed(() => minZoom.value),
    setMinZoom,

    getCenterOutsideSidetab,
    handleClick,
    googlePlace: computed(() => googlePlace.value),
    isClickedGooglePlace: computed(() => isClickedGooglePlace.value),
    closeImportWindow,
    navigateToNewPlaceForm,
  };
}
