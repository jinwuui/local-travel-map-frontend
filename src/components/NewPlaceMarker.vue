<template>
  <Marker
    :options="{
      position: { lat: newPlace.lat, lng: newPlace.lng },
      draggable: true,
      icon: markerIcon,
    }"
    @dragend="markerDragend"
  >
    <img class="click-marker-img" :src="markerIcon" />
  </Marker>
</template>

<script setup>
import { onMounted } from "vue";
import { Marker } from "vue3-google-map";
import useNewPlace from "@/components/states/useNewPlace";

const { newPlace, markerDragend } = useNewPlace();

const markerIcon = require("@/assets/test.png");

onMounted(() => {
  console.log("marker on mounted");
});
</script>

<style scoped>
.click-marker-img {
  width: 40px;
  height: 40px;
}
</style>
