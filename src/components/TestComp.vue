<template>
  <div class="map-wrapper">
    <GoogleMap
      id="map"
      ref="mapRef"
      :center="center"
      :zoom="15"
      api-key="AIzaSyA7kE8k5LTUFmxVvPAxAcMm6UBv98rOoVg"
    >
      <MarkerCluster>
        <template v-for="m of markers" :key="m.id">
          <CustomMarker
            :options="m.options"
            v-if="!openedMarker || openedMarker.id !== m.id"
            :key="'marker_' + m.id"
          >
            <div class="CustomMarker" @click.prevent="openMarker(m)">
              <p>Marker</p>
            </div>
          </CustomMarker>
        </template>
        <InfoWindow
          class="custom-infowindow"
          v-if="openedMarker"
          :options="openedMarker.options"
          @closeclick="openMarker(null)"
        >
          <img src="../assets/add_place.svg" />
          <p>Marker</p>
        </InfoWindow>
      </MarkerCluster>
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  GoogleMap,
  CustomMarker,
  MarkerCluster,
  InfoWindow,
} from "vue3-google-map";

export default defineComponent({
  components: {
    GoogleMap,
    MarkerCluster,
    CustomMarker,
    InfoWindow,
  },
  setup() {
    const mapRef = ref(null);
    return {
      mapRef,
      console,
    };
  },
  data() {
    return {
      isOpened: false,
      open: false,
      center: { lat: 35.16748, lng: 129.11503 },
      openedMarker: false,
      places: [
        { options: { position: { lat: 35.16748, lng: 129.11503 } } },
        { options: { position: { lat: 35.16748, lng: 129.11503 } } },
      ],
      information: null,
    };
  },

  mounted() {},
  computed: {
    ready() {
      return this.mapRef?.ready || false;
    },
    markers() {
      this.console.log("markers");
      if (!this.ready) {
        return [];
      }
      return this.places;
    },
  },
  methods: {
    openMarker(marker) {
      if (marker) {
        this.openedMarker = marker;
        this.open = true;
      } else {
        this.openedMarker = false;
        this.open = false;
      }
      return false;
    },
  },
});
</script>

<style>
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
}
</style>
