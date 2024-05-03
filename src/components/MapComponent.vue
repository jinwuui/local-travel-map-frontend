<template>
  <GoogleMap id="map" :api-key="apiKey" :center="center" :zoom="3">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const center = { lat: 40.689247, lng: -74.044502 };
const apiKey = process.env.VUE_APP_MAP_KEY;
</script>

<style>
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
