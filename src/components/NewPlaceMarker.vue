<template>
  <Marker
    :options="{
      position: { lat: newPlace.lat, lng: newPlace.lng },
      draggable: true,
      icon: newPlaceMarkerIcon,
    }"
    @dragend="markerDragend"
  />
</template>

<script setup>
import { Marker } from "vue3-google-map";
import useNewPlace from "@/components/states/useNewPlace";

const { newPlace, markerDragend } = useNewPlace();

const newPlaceMarkerIcon = require("@/assets/pixels/new_place_marker_40.png");
</script>

<style scoped></style>
