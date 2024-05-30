<template>
  <div v-for="place in places" :key="place.placeId">
    <CustomMarker
      v-if="place.placeId !== selectedPlace?.placeId"
      @click.stop="selectPlace(place)"
      :options="{
        position: { lat: place.lat, lng: place.lng },
        anchorPoint: 'BOTTOM_CENTER',
      }"
    >
      <img class="default-marker" :src="defaultMarkerIcon" />
    </CustomMarker>
    <CustomMarker
      v-else
      :options="{
        position: { lat: place.lat, lng: place.lng },
        anchorPoint: 'BOTTOM_CENTER',
      }"
    >
      <img class="selected-marker" :src="selectedMarkerIcon" />
    </CustomMarker>
  </div>
</template>

<script setup>
import { CustomMarker } from "vue3-google-map";

import usePlace from "@/components/states/usePlace";
import useSelectedPlace from "@/components/states/useSelectedPlace";

const { places } = usePlace();
const { selectedPlace, selectPlace } = useSelectedPlace();

const defaultMarkerIcon = require("@/assets/pixels/default_marker.png");
const selectedMarkerIcon = require("@/assets/pixels/selected_marker.png");
</script>

<style>
.default-marker {
  height: 35px;
}

.selected-marker {
  height: 50px;
}
</style>
