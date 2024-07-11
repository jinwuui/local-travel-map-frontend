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
          <img
            v-if="place.isFavorite"
            img
            class="favorite-marker"
            :src="favoriteMarker"
          />
          <img v-else class="default-marker" :src="defaultMarker" />
        </CustomMarker>
        <CustomMarker
          v-else
          :options="{
            position: { lat: place.lat, lng: place.lng },
            anchorPoint: 'BOTTOM_CENTER',
          }"
        >
          <img class="selected-marker" :src="selectedMarker" />
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

const { places, fetchPlaces } = usePlace();
const { selectedPlace, selectPlace } = useSelectedPlace();

const defaultMarker = require("@/assets/pixels/default_marker.png");
const favoriteMarker = require("@/assets/pixels/favorite_marker.png");
const selectedMarker = require("@/assets/pixels/selected_marker.png");
const renderCluster = ref(false);

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
        url: require("@/assets/pixels/cluster.png"),
        // eslint-disable-next-line
        scaledSize: new google.maps.Size(50, 50),
      },
      // eslint-disable-next-line
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    }),
};

onMounted(async () => {
  await fetchPlaces()
    .then(() => (renderCluster.value = true))
    .catch(async (error) => {
      console.error("장소 불러오기 재시도 - ", error);
      await fetchPlaces().then(() => (renderCluster.value = true));
    });
});
</script>

<style>
.default-marker {
  height: 35px;
}

.favorite-marker {
  height: 50px;
}

.selected-marker {
  height: 50px;
}
</style>
