<template>
  <Marker
    :options="markerOptions"
    @dragstart="handleMarkerDragstart"
    @dragend="handleMarkerDragend"
  />
</template>

<script setup>
import { ref } from "vue";
import { Marker } from "vue3-google-map";
import useNewPlace from "@/components/body/states/useNewPlace";

const { newPlace, setNewPlacePosition } = useNewPlace();

const newPlaceMarkerIcon = require("@/assets/pixels/new_place_default.png");
const dragPlaceMarkerIcon = require("@/assets/pixels/new_place_dragged.png");

const markerOptions = ref({
  position: { lat: newPlace.value.lat, lng: newPlace.value.lng },
  draggable: true,
  icon: {
    url: newPlaceMarkerIcon,
    scaledSize: { width: 50, height: 50 },
  },
});

function handleMarkerDragstart() {
  markerOptions.value = {
    ...markerOptions.value,
    icon: {
      url: dragPlaceMarkerIcon,
      scaledSize: { width: 60, height: 70 },
    },
  };
}

function handleMarkerDragend(event) {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  markerOptions.value = {
    ...markerOptions.value,
    position: { lat: lat, lng: lng },
    icon: {
      url: newPlaceMarkerIcon,
      scaledSize: { width: 50, height: 50 },
    },
  };

  setNewPlacePosition(lat, lng);
}
</script>

<style scoped></style>
