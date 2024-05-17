<template>
  <GoogleMap
    id="map"
    ref="mapRef"
    :api-key="apiKey"
    :center="center"
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
import { ref, watch } from "vue";
import { GoogleMap } from "vue3-google-map";

import PlaceCluster from "@/components/PlaceCluster.vue";
import NewPlace from "@/components/NewPlace.vue";

import usePlace from "@/components/states/usePlace";
import useNewPlace from "@/components/states/useNewPlace";

const apiKey = process.env.VUE_APP_MAP_KEY;
const center = ref({ lat: 35.16748, lng: 129.11503 });
const mapRef = ref(null);

const { loading, fetch } = usePlace();
const { isFormOpen, openForm } = useNewPlace();

watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (!ready) return;

    fetch();
  }
);
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
