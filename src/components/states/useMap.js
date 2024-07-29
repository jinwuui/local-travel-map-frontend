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

function getCenterOfMap() {
  if (!mapRef.value) return null;

  const gmap = mapRef.value.map;
  const center = gmap.getCenter();

  return { lat: center.lat(), lng: center.lng() };
}

function getCenterWithImportWindow(placeLat, placeLng) {
  try {
    const map = mapRef.value?.map;
    if (!map) throw new Error("Map is not available");

    const projection = map.getProjection();
    if (!projection) throw new Error("Projection is not available");

    const centerPoint = projection.fromLatLngToPoint({
      lat: placeLat,
      lng: placeLng,
    });
    if (!centerPoint) throw new Error("Failed to convert from LatLng to Point");

    const scale = Math.pow(2, map.getZoom());
    const offset = 300 / 2 / scale;
    const newPoint = { x: centerPoint.x, y: centerPoint.y - offset };

    const newLatLng = projection.fromPointToLatLng(newPoint);
    if (!newLatLng) throw new Error("Failed to convert from Point to LatLng");

    return { lat: newLatLng.lat(), lng: newLatLng.lng() };
  } catch (error) {
    console.error("Error in getCenterWithImportWindow:", error);
    return { lat: placeLat, lng: placeLng };
  }
}

async function handleClick(event) {
  if (event.placeId) {
    try {
      event.stop();

      const data = await googleMapsAPI.getPlaceDetails(event.placeId);
      isClickedGooglePlace.value = true;
      googlePlace.value = data;

      const latLng = getCenterWithImportWindow(
        googlePlace.value.location.latitude,
        googlePlace.value.location.longitude
      );

      setMapCenter(latLng.lat, latLng.lng);
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

    getCenterOfMap,
    handleClick,
    googlePlace: computed(() => googlePlace.value),
    isClickedGooglePlace: computed(() => isClickedGooglePlace.value),
    closeImportWindow,
    navigateToNewPlaceForm,
  };
}
