<template>
  <CustomMarker
    :options="{
      position: { lat: lat, lng: lng },
      anchorPoint: 'BOTTOM_CENTER',
    }"
  >
    <img id="click-marker" :src="markerIcon" />
  </CustomMarker>
  <InfoWindow
    :options="{
      position: { lat: lat, lng: lng },
      pixelOffset: { width: 0, height: -35 },
    }"
    @closeclick="closeRegistration"
  >
    <div>
      <div class="col-container">
        <p>등록하기</p>
        <input type="text" placeholder="이름" v-model="place.name" />
        <input type="number" placeholder="평점" v-model="place.rating" />
        <textarea placeholder="설명" v-model="place.description" />
      </div>
      <div class="row-container">
        <button @click="savePlace">저장</button>
        <button>취소</button>
        <button>🏞️</button>
      </div>
    </div>
  </InfoWindow>
</template>

<script setup>
import { defineModel, ref } from "vue";
import { CustomMarker, InfoWindow } from "vue3-google-map";
import { placeAPI } from "../services/place.api";
import Place from "../models/Place";

const isActive = defineModel("isActive", { default: false });
const lat = defineModel("lat", { default: -1 });
const lng = defineModel("lng", { default: -1 });
const markerIcon = require("@/assets/add_place.svg");

const place = ref(new Place());

function closeRegistration() {
  isActive.value = false;
}

function savePlace() {
  if (place.value.isValid()) {
    placeAPI.postPlace(place.value);
  } else {
    alert("잘못된 입력");
  }
}
</script>

<style scoped>
.col-container {
  display: flex;
  flex-direction: column; /* 세로 방향으로 요소를 정렬 */
  align-items: center; /* 가로 방향 중앙 정렬 */
  padding: 5px; /* 패딩 추가 */
  gap: 5px; /* 요소들 사이의 간격 */
}
.row-container {
  display: flex; /* 플렉스 컨테이너 설정 */
  align-items: center; /* 세로 방향 중앙 정렬 */
  justify-content: center; /* 가로 방향 중앙 정렬 */
  padding: 5px; /* 패딩 추가 */
  gap: 5px; /* 요소들 사이의 간격 */
  flex-wrap: wrap; /* 필요한 경우 다음 줄로 넘김 */
}
</style>
