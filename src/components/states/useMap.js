import { computed, ref } from "vue";

const mapCenter = ref({ lat: 35.16748, lng: 129.11503 });
const mapRef = ref(null);

function setMapCenter(lat, lng) {
  mapCenter.value = { lat: lat, lng: lng };
}

function getCenterOutsideSidetab() {
  if (!mapRef.value) return null;

  const gmap = mapRef.value.map;
  const projection = gmap.getProjection();

  if (!projection) return null;

  const currentCenter = gmap.getCenter();
  const centerPoint = projection.fromLatLngToPoint(currentCenter);

  const scale = Math.pow(2, gmap.getZoom());
  const newPoint = {
    x: centerPoint.x + 434 / 2 / scale,
    y: centerPoint.y + 40 / scale,
  };

  const newLatLng = projection.fromPointToLatLng(newPoint);
  return { lat: newLatLng.lat(), lng: newLatLng.lng() };
}

export default function useMap() {
  return {
    mapCenter: computed(() => mapCenter.value),
    mapRef,
    setMapCenter,
    getCenterOutsideSidetab,
  };
}
