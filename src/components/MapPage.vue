<template>
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

    <NewPlace v-if="isFormOpen" />
  </GoogleMap>
</template>

<script setup>
import { onMounted } from "vue";
import { GoogleMap } from "vue3-google-map";

import PlaceCluster from "@/components/PlaceCluster.vue";
import NewPlace from "@/components/NewPlace.vue";

import useMap from "@/components/states/useMap";
import usePlace from "@/components/states/usePlace";
import useNewPlace from "@/components/states/useNewPlace";

const apiKey = process.env.VUE_APP_MAP_KEY;

const { mapRef, mapCenter } = useMap();
const { loading, fetch } = usePlace();
const { isFormOpen, openForm } = useNewPlace();

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
