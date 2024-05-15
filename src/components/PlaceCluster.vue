<template>
  <template v-if="places.value.length != 0">
    <MarkerCluster>
      <CustomMarker
        v-for="(place, i) in places.value"
        :key="i"
        @click.stop="clickMarker(place, i)"
        :options="{
          position: { lat: place.lat, lng: place.lng },
          anchorPoint: 'BOTTOM_CENTER',
          zindex: 1000,
        }"
      >
        <img
          v-if="i == selectedPlaceIndex"
          id="selected-marker"
          :src="selectedMarkerIcon"
        />
        <img v-else id="basic-marker" :src="markerIcon" />
      </CustomMarker>
    </MarkerCluster>
  </template>
</template>

<script setup>
import { ref, watch } from "vue";
import { MarkerCluster, CustomMarker } from "vue3-google-map";
import { selectPlace } from "./states/selected-place";
import { places } from "./states/places";

const markerIcon = require("@/assets/place.svg");
const selectedMarkerIcon = require("@/assets/selected_place.svg");

const selectedPlaceIndex = ref(null);

watch(places, () => {
  console.log("places updated:", places);
});

function clickMarker(place, index) {
  selectedPlaceIndex.value = index;
  selectPlace(place);
}
</script>

<style>
#selected-marker {
  height: 40px;
  width: 40px;
  /* display: block; */
  /* margin-left: 50%; */
  /* transform: translateX(25%); */
}
</style>
