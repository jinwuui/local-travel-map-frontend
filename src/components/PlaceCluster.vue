<template>
  <div>
    <CustomMarker
      v-for="place in places"
      :key="place.placeId"
      @click.stop="selectPlace(place)"
      :options="{
        position: { lat: place.lat, lng: place.lng },
        anchorPoint: 'BOTTOM_CENTER',
        zindex: 1000,
      }"
    >
      <img
        v-if="place.placeId === selectedPlace?.placeId"
        id="selected-marker"
        :src="selectedMarkerIcon"
      />
      <img v-else id="basic-marker" :src="markerIcon" />
    </CustomMarker>
  </div>
</template>

<script setup>
import { CustomMarker } from "vue3-google-map";

import usePlace from "@/components/states/usePlace";
import useSelectedPlace from "@/components/states/useSelectedPlace";

const { places } = usePlace();
const { selectedPlace, selectPlace } = useSelectedPlace();

const markerIcon = require("@/assets/place.svg");
const selectedMarkerIcon = require("@/assets/selected_place.svg");
</script>

<style>
#selected-marker {
  height: 40px;
  width: 40px;
  /* display: block; */
  /* margin-left: 50%; */
  /* transform: translateX(25%); */
}

#tmp {
  align-content: center;
}
</style>
