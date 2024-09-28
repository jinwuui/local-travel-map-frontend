<template>
  <MarkerCluster :options="{ renderer: renderer }">
    <template v-if="renderCluster">
      <div v-for="place in places" :key="place.placeId">
        <CustomMarker
          v-if="place.placeId !== selectedPlace?.placeId"
          @click.stop="selectPlace(place)"
          :options="{
            position: { lat: place.lat, lng: place.lng },
            anchorPoint: 'BOTTOM_CENTER',
          }"
        >
          <img
            v-if="place.isBookmarked"
            img
            class="bookmark-marker"
            :src="bookmarkMarker"
            height="50px"
            width="50px"
          />
          <img
            v-else
            class="default-marker"
            :src="defaultMarker"
            height="35px"
            width="35px"
          />
        </CustomMarker>
        <CustomMarker
          v-else
          :options="{
            position: { lat: place.lat, lng: place.lng },
            anchorPoint: 'BOTTOM_CENTER',
          }"
        >
          <img
            class="selected-marker"
            :src="selectedMarker"
            height="50px"
            width="50px"
          />
        </CustomMarker>
      </div>
    </template>
  </MarkerCluster>
</template>

<script setup>
import { CustomMarker, MarkerCluster } from "vue3-google-map";

import usePlace from "@/components/states/usePlace";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { places, renderCluster } = usePlace();
const { selectedPlace, selectPlace } = useSelectedPlace();

const defaultMarker = require("@/assets/pixels/default_marker.webp");
const bookmarkMarker = require("@/assets/pixels/bookmark_marker.webp");
const selectedMarker = require("@/assets/pixels/selected_marker.webp");

const renderer = {
  render: ({ count, position }) =>
    // eslint-disable-next-line
    new google.maps.Marker({
      label: {
        text: String(count),
        color: "black",
        fontFamily: "subset-DOSIyagiBoldface",
        fontSize: "30px",
      },
      position,
      icon: {
        url: require("@/assets/pixels/cluster.webp"),
        // eslint-disable-next-line
        scaledSize: new google.maps.Size(50, 50),
      },
      // eslint-disable-next-line
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    }),
};
</script>

<style>
.default-marker {
  height: 35px;
  width: auto;
}

.bookmark-marker {
  height: 50px;
  width: auto;
}

.selected-marker {
  height: 50px;
  width: auto;
}
</style>
