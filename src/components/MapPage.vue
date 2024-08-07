<template>
  <div>
    <GoogleMap
      id="map"
      ref="mapRef"
      :api-key="apiKey"
      :center="mapCenter"
      :zoom="mapZoom"
      :minZoom="minZoom"
      :restriction="restriction"
      draggableCursor="default"
      mapTypeId="terrain"
      :styles="styles"
      regin="KR"
      :language="locale"
      :fullscreenControl="screenControl.fullscreenControl"
      :scaleControl="screenControl.scaleControl"
      :zoomControl="screenControl.scaleControl"
      :map-type-control-options="screenControl.mapTypeControlOptions"
      @click="handleClick"
    >
      <PlaceCluster />
      <NewPlaceMarker v-if="isNewPlaceFormOpen" />
      <GoogleImportWindow />
    </GoogleMap>
  </div>
  <div class="new-place-btn" @click="clickNewPlaceBtn">
    <img v-if="isMobile" :src="newPlaceBtnIcon" />
    <p v-else>{{ newPlaceBtnText }}</p>
  </div>
  <LoginForm v-if="isLoginFormOpen" />
  <LoadingDots v-if="isMapFetchLoading" />
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { watch, computed, onBeforeMount } from "vue";
import { GoogleMap } from "vue3-google-map";

import LoadingDots from "@/components/LoadingDots.vue";
import PlaceCluster from "@/components/PlaceCluster.vue";
import NewPlaceMarker from "@/components/NewPlaceMarker.vue";
import GoogleImportWindow from "@/components/GoogleImportWindow.vue";
import LoginForm from "@/components/body/LoginForm.vue";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useMap from "@/components/states/useMap";
import usePlace from "@/components/states/usePlace";
import useNewPlace from "@/components/body/states/useNewPlace";

const apiKey = process.env.VUE_APP_MAP_KEY;

const { isMobile, activeSideTab, isLoginFormOpen, isMapFetchLoading } = uiState;

const {
  mapRef,
  mapCenter,
  mapZoom,
  minZoom,
  setMinZoom,
  getCenterOfMap,
  handleClick,
} = useMap();
const { fetchPlaces } = usePlace();
const { openNewPlaceForm, closeNewPlaceForm } = useNewPlace();

const closeIcon = require("@/assets/icons/close.svg");
const addIcon = require("@/assets/icons/add.svg");

onBeforeMount(() => {
  const longerLength =
    window.devicePixelRatio * Math.max(window.innerWidth, window.innerHeight);
  setMinZoom(Math.min(Math.floor(longerLength / 1200) + 1, 4));
});

watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (!ready) return;

    mapRef.value.map.get("streetView").setOptions({
      addressControlOptions: {
        position: mapRef.value.api.ControlPosition.BOTTOM_CENTER,
      },
    });
    fetchPlaces();
  }
);

const isNewPlaceFormOpen = computed(
  () => activeSideTab.value === COMPONENT_NAMES.NEW_PLACE_FORM
);

const newPlaceBtnText = computed(() =>
  isNewPlaceFormOpen.value ? t("app.취소하기") : t("app.등록하기")
);

const newPlaceBtnIcon = computed(() =>
  isNewPlaceFormOpen.value ? closeIcon : addIcon
);

const restriction = {
  latLngBounds: {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  },
};

const screenControl = {
  fullscreenControl: false,
  scaleControl: false,
  zoomControl: false,
  mapTypeControlOptions: { position: 7 },
};

function clickNewPlaceBtn() {
  if (isNewPlaceFormOpen.value) {
    closeNewPlaceForm();
  } else {
    const { lat, lng } = getCenterOfMap();
    openNewPlaceForm({ lat: lat, lng: lng });
  }
}

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
  position: fixed;
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
