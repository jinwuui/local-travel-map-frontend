import { computed, ref } from "vue";

const mapCenter = ref({ lat: 37.5642135, lng: 127.0016985 });
const mapZoom = ref(3);
const mapRef = ref(null);

function setMapCenter(lat, lng) {
  mapCenter.value = { lat: lat, lng: lng };
  mapZoom.value = 14;
}

function getCenterOutsideSidetab() {
  if (!mapRef.value) return null;

  const gmap = mapRef.value.map;
  const center = gmap.getCenter();

  return { lat: center.lat(), lng: center.lng() };
}

export default function useMap() {
  return {
    mapCenter: computed(() => mapCenter.value),
    mapZoom: computed(() => mapZoom.value),
    mapRef,
    setMapCenter,
    getCenterOutsideSidetab,
  };
}
