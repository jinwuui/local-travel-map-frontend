<template>
  <div>
    <GoogleMap
      id="map"
      ref="mapRef"
      :api-key="apiKey"
      :center="mapCenter"
      :zoom="mapZoom"
      scrollwheel="false"
      draggableCursor="default"
      mapTypeId="terrain"
      :styles="styles"
      region="KR"
      language="ko"
      :fullscreenControl="screenControl.fullscreenControl"
      :scaleControl="screenControl.scaleControl"
      :zoomControl="screenControl.scaleControl"
      :map-type-control-options="screenControl.mapTypeControlOptions"
    >
      <span v-if="isMapFetchLoading">Loading places</span>
      <div v-else><PlaceCluster /></div>

      <NewPlaceMarker v-if="isNewPlaceFormOpen" />
    </GoogleMap>
  </div>
  <div class="new-place-btn" @click="clickNewPlaceBtn">
    <img v-if="isMobile" :src="newPlaceBtnIcon" />
    <p v-else>{{ newPlaceBtnText }}</p>
  </div>
  <LoginForm v-if="isLoginFormOpen" />
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { GoogleMap } from "vue3-google-map";

import PlaceCluster from "@/components/PlaceCluster.vue";
import NewPlaceMarker from "@/components/NewPlaceMarker.vue";
import LoginForm from "@/components/body/LoginForm.vue";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import usePlace from "@/components/states/usePlace";
import useNewPlace from "@/components/body/states/useNewPlace";

const apiKey = process.env.VUE_APP_MAP_KEY;

const { isMobile, isMapFetchLoading, activeSideTab, isLoginFormOpen } = uiState;

const { mapRef, mapCenter, mapZoom, getCenterOutsideSidetab } = useMap();
const { fetchPlaces } = usePlace();
const { openNewPlaceForm, closeNewPlaceForm } = useNewPlace();

const closeIcon = require("@/assets/icons/close.svg");
const addIcon = require("@/assets/icons/add.svg");

const isNewPlaceFormOpen = computed(
  () => activeSideTab.value === COMPONENT_NAMES.NEW_PLACE_FORM
);

const newPlaceBtnText = computed(() =>
  isNewPlaceFormOpen.value ? "취소하기" : "등록하기"
);

const newPlaceBtnIcon = computed(() =>
  isNewPlaceFormOpen.value ? closeIcon : addIcon
);

const screenControl = {
  fullscreenControl: false,
  scaleControl: false,
  zoomControl: false,
  mapTypeControlOptions: { position: 7 },
};

onMounted(async () => await fetchPlaces());

function clickNewPlaceBtn() {
  if (isNewPlaceFormOpen.value) {
    closeNewPlaceForm();
  } else {
    const { lat, lng } = getCenterOutsideSidetab();
    openNewPlaceForm(lat, lng);
  }
}

watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (!ready) return;

    mapRef.value.map.get("streetView").setOptions({
      addressControlOptions: {
        position: mapRef.value.api.ControlPosition.BOTTOM_CENTER,
      },
    });
  }
);

const styles = [
  {
    featureType: "landscape",
    stylers: [
      {
        hue: "#FFA800",
      },
      {
        saturation: 0,
      },
      {
        lightness: 0,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        hue: "#53FF00",
      },
      {
        saturation: -73,
      },
      {
        lightness: 40,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        hue: "#FBFF00",
      },
      {
        saturation: 0,
      },
      {
        lightness: 0,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        hue: "#00FFFD",
      },
      {
        saturation: 0,
      },
      {
        lightness: 30,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#90bdca",
      },
      {
        lightness: "10",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        hue: "#679714",
      },
      {
        saturation: 33.4,
      },
      {
        lightness: -25.4,
      },
      {
        gamma: 1,
      },
    ],
  },
];
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
  background-color: #f44336;
  border: 2.3px solid #d32f2f;
  border-radius: 7px;
  box-shadow: 0 4px #b71c1c;
  color: #fff;
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0 #b71c1c;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}

.new-place-btn:hover {
  background-color: #e53935;
}

.new-place-btn:active {
  transform: translateY(3px);
  box-shadow: 0 2px #b71c1c;
}

.new-place-btn > p {
  margin: 7px;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .new-place-btn {
    bottom: auto;
    top: 140px;
    right: 10px;
    left: auto;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
  }

  .new-place-btn > img {
    margin: auto;
    width: 54px;
    height: 54px;
  }
}
</style>
