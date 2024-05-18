<template>
  <CustomMarker
    :options="{
      position: { lat: newPlace.lat, lng: newPlace.lng },
      anchorPoint: 'BOTTOM_CENTER',
    }"
  >
    <img id="click-marker" :src="markerIcon" />
  </CustomMarker>
  <InfoWindow
    :options="{
      position: { lat: newPlace.lat, lng: newPlace.lng },
      pixelOffset: { width: 0, height: -35 },
    }"
    @closeclick="closeForm"
  >
    <div>
      <div class="col-container">
        <p>등록하기</p>
        <input type="text" placeholder="이름" v-model="newPlace.name" />
        <input type="number" placeholder="평점" v-model="newPlace.rating" />
        <input type="text" placeholder="카테고리" v-model="newPlace.category" />
        <textarea placeholder="설명" v-model="newPlace.description" />
      </div>
      <div v-if="imageUrls.length" class="image-preview">
        <div
          v-for="(url, index) in imageUrls"
          :key="index"
          class="preview-container"
        >
          <img :src="url" alt="Image preview" />
        </div>
      </div>
      <div class="row-container">
        <button @click="addNewPlace(selectedFiles)">저장</button>
        <button>취소</button>
        <div class="file-upload">
          <label for="file-input" class="file-upload-button">사진 추가</label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            @change="onFileChange"
            multiple
          />
        </div>
      </div>
    </div>
  </InfoWindow>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { CustomMarker, InfoWindow } from "vue3-google-map";
import useNewPlace from "@/components/states/useNewPlace";

const { closeForm, newPlace, addNewPlace } = useNewPlace();

const markerIcon = require("@/assets/add_place.svg");

const selectedFiles = ref([]);
const imageUrls = ref([]);

function onFileChange(event) {
  const files = Array.from(event.target.files);

  selectedFiles.value = files;
  imageUrls.value = files.map((file) => URL.createObjectURL(file));
}

onBeforeUnmount(() => {
  // 컴포넌트가 소멸되기 전에 URL 객체 해제
  imageUrls.value.forEach((url) => URL.revokeObjectURL(url));
});
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

.file-upload {
  display: inline-block;
  position: relative;
  border: 2px solid #3498db;
  border-radius: 5px;
  padding: 3px;
}
.file-upload input[type="file"] {
  display: none;
}

.image-preview {
  margin-top: 10px;
}
.preview-container {
  display: inline-block;
  margin: 5px;
}
.preview-container img {
  max-width: 100px;
  max-height: 100px;
  border: 2px solid #3498db;
  border-radius: 5px;
}
</style>
