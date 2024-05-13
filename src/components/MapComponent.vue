<template>
  <GoogleMap
    id="map"
    ref="mapRef"
    :api-key="apiKey"
    :center="center"
    :zoom="15"
    @click="openRegistration"
    draggableCursor="default"
  >
    <LocationCluster />
    <template v-if="isActive">
      <LocationRegistration
        v-model:isActive="isActive"
        v-model:lat="registrationWindowInfo.lat"
        v-model:lng="registrationWindowInfo.lng"
      />
    </template>
  </GoogleMap>
</template>

<script setup>
import { ref, watch } from "vue";
import LocationCluster from "./LocationCluster.vue";
import LocationRegistration from "./LocationRegistration.vue";
import { GoogleMap } from "vue3-google-map";

const apiKey = process.env.VUE_APP_MAP_KEY;
const center = ref({ lat: 35.16748, lng: 129.11503 });
const mapRef = ref(null);
watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (!ready) return;

    console.log("map ready");
    // do something with the api using `mapRef.value.ap˜i`
    // or with the map instance using `mapRef.value.map`
  }
);

// const markerIcon = computed(() =>
//   mapRef.value?.ready
//     ? {
//         url: "@/assets/add_location.svg",
//         scaledSize: new mapRef.value.api.Size(20, 20),
//       }
//     : null
// );

const isActive = ref(false);
const registrationWindowInfo = ref({
  lat: -1,
  lng: -1,
});

function openRegistration(event) {
  console.log("open regi", isActive.value);
  isActive.value = true;
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  registrationWindowInfo.value = {
    lat: lat,
    lng: lng,
  };
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
</style>
