<template>
  <MarkerCluster>
    <Marker
      v-for="(location, i) in locations"
      :key="i"
      :options="{ position: location.postion }"
      @click="openInfoTab(location)"
    />
  </MarkerCluster>
</template>

<script setup>
import { Marker, MarkerCluster } from "vue3-google-map";

const locations = [
  {
    postion: { lat: -31.56391, lng: 147.154312 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -33.718234, lng: 150.363181 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -33.727111, lng: 150.371124 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -33.848588, lng: 151.209834 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -33.851702, lng: 151.216968 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -34.671264, lng: 150.863657 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -35.304724, lng: 148.662905 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -36.817685, lng: 175.699196 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -36.828611, lng: 175.790222 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.75, lng: 145.116667 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.759859, lng: 145.128708 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.765015, lng: 145.133858 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.770104, lng: 145.143299 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.7737, lng: 145.145187 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.774785, lng: 145.137978 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -37.819616, lng: 144.968119 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -38.330766, lng: 144.695692 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -39.927193, lng: 175.053218 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -41.330162, lng: 174.865694 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -42.734358, lng: 147.439506 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -42.734358, lng: 147.501315 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -42.735258, lng: 147.438 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
  {
    postion: { lat: -43.999792, lng: 170.463352 },
    name: "loc",
    description: "desc",
    rating: 2,
  },
];

function openInfoTab(location) {
  console.log("openInfoTab", location);
}
</script>
