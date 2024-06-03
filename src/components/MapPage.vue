<template>
  <div>
    <GoogleMap
      id="map"
      ref="mapRef"
      :api-key="apiKey"
      :center="mapCenter"
      :zoom="15"
      draggableCursor="default"
      region="KR"
      language="ko"
    >
      <span v-if="isMapFetchLoading">Loading places</span>
      <div v-else><PlaceCluster /></div>

      <NewPlace v-if="false" />
      <NewPlaceMarker v-if="isNewPlaceFormOpen" />
    </GoogleMap>
  </div>
  <div class="new-place-btn" @click="clickNewPlaceBtn">
    <p>{{ isNewPlaceFormOpen ? "등록취소" : "등록하기" }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { GoogleMap } from "vue3-google-map";

import PlaceCluster from "@/components/PlaceCluster.vue";
import NewPlace from "@/components/NewPlace.vue";
import NewPlaceMarker from "@/components/NewPlaceMarker.vue";

import uiState from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import usePlace from "@/components/states/usePlace";
import useNewPlace from "@/components/states/useNewPlace";

const apiKey = process.env.VUE_APP_MAP_KEY;

const { isMapFetchLoading, isNewPlaceFormOpen } = uiState;

const { mapRef, mapCenter, getCenterOutsideSidetab } = useMap();
const { fetch } = usePlace();
const { openNewPlaceForm, closeNewPlaceForm } = useNewPlace();

onMounted(async () => await fetch());

function clickNewPlaceBtn() {
  if (isNewPlaceFormOpen.value) {
    closeNewPlaceForm();
  } else {
    const { lat, lng } = getCenterOutsideSidetab();
    openNewPlaceForm(lat, lng);
  }
}
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

.new-place-btn {
  position: absolute;
  bottom: 3%;
  left: 50%;
  display: inline-block;
  padding: 0.1em 0.5em;
  background-color: #4caf50;
  border: 2.3px solid #388e3c;
  border-radius: 7px;
  box-shadow: 0 4px #2e7d32;
  color: #fff;
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0 #2e7d32;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}

.new-place-btn:hover {
  background-color: #43a047;
}

.new-place-btn:active {
  transform: translateY(3px);
  box-shadow: 0 2px #2e7d32;
}

.new-place-btn > p {
  margin: 7px;
}
</style>
