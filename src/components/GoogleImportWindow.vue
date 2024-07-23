<template>
  <CustomMarker
    v-if="isClickedGooglePlace"
    :options="{
      position: {
        lat: googlePlace.location.latitude,
        lng: googlePlace.location.longitude,
      },
      anchorPoint: 'BOTTOM_CENTER',
    }"
    @click.stop
  >
    <div class="import-window">
      <div class="title">
        <div class="title-text">
          {{ t("import-place.가져오기") }}
        </div>
      </div>

      <div class="import-window-border">
        <div class="import-window-content">
          <div class="import-info">
            <h1>{{ googlePlace.displayName.text }}</h1>
            <h2>{{ googlePlace.shortFormattedAddress }}</h2>
            <a :href="googlePlace.googleMapsUri" target="_blank">{{
              t("import-place.구글 지도에서 보기")
            }}</a>
          </div>

          <div class="button-group">
            <button class="button" @click="closeImportWindow">
              {{ t("import-place.취소") }}
            </button>
            <button class="button" @click="navigateToNewPlaceForm">
              {{ t("import-place.선택") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </CustomMarker>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { CustomMarker } from "vue3-google-map";
import useMap from "@/components/states/useMap";

const {
  googlePlace,
  isClickedGooglePlace,
  closeImportWindow,
  navigateToNewPlaceForm,
} = useMap();
</script>

<style scoped>
.import-window {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -32px;
  left: 0;
  cursor: default;
  z-index: 1500;
}

.import-window > div {
  font-family: "DungGeunMo", "PixelMplus12-Regular", Helvetica, Arial;
  background-color: rgb(35, 54, 80);
  color: white;
  overflow: auto;
}

.import-window-border {
  border-radius: 6px;
  padding: 2px;
}

.import-window-content {
  padding: 13px;
  padding-bottom: 20px;
  padding-top: 20px;
  border: 1.85px solid white;
  border-radius: 4px;
  width: 22em;
  min-width: 150px;
  min-height: 130px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  width: 40%;
  display: flex;
  justify-content: center;
  font-size: 1.3em;
  padding: 2px;
  padding-bottom: 0px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.title-text {
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top: 1.85px solid white;
  border-left: 1.85px solid white;
  border-right: 1.85px solid white;
}

a {
  font-size: 1.1em;
  color: aqua;
  text-decoration-line: none;
  padding-bottom: 2px;
  border-bottom: 0.1em solid aqua;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;
}

.button-group button {
  width: 6.5em;
  height: 2.2em;
  font-size: 1.2em;
}
</style>
