<template>
  <MarkerCluster :options="{ renderer: renderer }">
    <div v-if="renderCluster">
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
    </div>
  </MarkerCluster>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CustomMarker, MarkerCluster } from "vue3-google-map";

import usePlace from "@/components/states/usePlace";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { places } = usePlace();
const { selectedPlace, selectPlace } = useSelectedPlace();

const defaultMarkerIcon = require("@/assets/pixels/default_marker.png");
const selectedMarkerIcon = require("@/assets/pixels/selected_marker.png");
const renderCluster = ref(false);

const renderer = {
  render: ({ count, position }) =>
    // eslint-disable-next-line
    new google.maps.Marker({
      label: {
        text: String(count),
        color: "black",
        fontFamily: "DOSIyagiBoldface",
        fontSize: "30px",
      },
      position,
      icon: {
        url: require("@/assets/pixels/cluster.png"),
        // eslint-disable-next-line
        scaledSize: new google.maps.Size(50, 50),
      },
      // eslint-disable-next-line
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    }),
};

onMounted(() => {
  setTimeout(() => {
    renderCluster.value = true;
  }, 200);
});
</script>

<style>
.default-marker {
  height: 35px;
}

.selected-marker {
  height: 50px;
}
</style>
