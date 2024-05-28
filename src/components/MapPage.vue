<template>
  <div>
    <GoogleMap
      id="map"
      ref="mapRef"
      :api-key="apiKey"
      :center="mapCenter"
      :zoom="15"
      @click="openForm"
      draggableCursor="default"
    >
      <span v-if="loading">Loading places</span>
      <div v-else><PlaceCluster /></div>

      <NewPlace v-if="false" />
      <NewPlaceMarker v-if="isFormOpen" />
    </GoogleMap>
    <CategorySearchBar />
    <NewPlaceButton @click="openNewPlaceForm" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { GoogleMap } from "vue3-google-map";

import CategorySearchBar from "@/components/CategorySearchBar.vue";
import PlaceCluster from "@/components/PlaceCluster.vue";
import NewPlace from "@/components/NewPlace.vue";
import NewPlaceButton from "@/components/NewPlaceButton.vue";
import NewPlaceMarker from "@/components/NewPlaceMarker.vue";

import useMap from "@/components/states/useMap";
import usePlace from "@/components/states/usePlace";
import useNewPlace from "@/components/states/useNewPlace";

const apiKey = process.env.VUE_APP_MAP_KEY;

const { mapRef, mapCenter, getCenterOutsideSidetab } = useMap();
const { loading, fetch } = usePlace();
const { openForm, isFormOpen } = useNewPlace();

function openNewPlaceForm() {
  const { lat, lng } = getCenterOutsideSidetab();
  openForm(lat, lng);
}

onMounted(async () => await fetch());
</script>

<style>
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.icon-area {
  border: 2px solid red;
  display: inline-block;
}

#click-marker {
  width: 39px;
  height: 39px;
  margin-bottom: -6px;
}
</style>
