import { computed, ref } from "vue";

const mapCenter = ref({ lat: 35.16748, lng: 129.11503 });
const mapRef = ref(null);

function setMapCenter(lat, lng) {
  mapCenter.value = { lat: lat, lng: lng };
}

export default function useMap() {
  return {
    mapCenter: computed(() => mapCenter.value),
    mapRef: computed(() => mapRef.value),
    setMapCenter,
  };
}
