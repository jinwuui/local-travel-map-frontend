<template>
  <div class="new-place-form">
    <div class="step-0 step-content" v-if="step === 0">
      <input type="text" placeholder="이름" v-model="newPlace.name" />
      <div class="category-selection">
        <div
          v-for="category in categories"
          :key="category"
          :class="[
            'badge',
            { selected: newPlace.categories.includes(category) },
          ]"
          @click="toggleCategory(category)"
        >
          {{ category }}
        </div>
      </div>
      <textarea
        placeholder="설명"
        v-model="newPlace.description"
        maxlength="50"
      />
    </div>

    <div class="step-1 step-content" v-if="step === 1">
      <div class="rating">
        <img
          v-for="number in 5"
          :key="number"
          :class="[number <= newPlace.rating ? 'active' : 'inactive']"
          :src="ratingStarIcon"
          alt="star"
          @click="changeRating(number)"
        />
      </div>
      <div class="image-preview">
        <div class="preview-container file-upload" @click="triggerFileInput">
          <div>
            <p>
              사진<br />
              <small>{{ selectedFiles.length }} / 3</small>
            </p>
          </div>
          <input
            ref="fileInput"
            id="file-input"
            type="file"
            accept="image/*"
            @change="onFileChange"
            multiple
            class="hidden"
          />
        </div>
        <div
          v-for="(url, index) in imageUrls"
          :key="index"
          class="preview-container photos"
        >
          <div class="remove-badge" @click="removeImage(index)">X</div>
          <img :src="url" alt="Image preview" />
        </div>
      </div>
    </div>

    <div class="step-change">
      <button @click="step === 0 ? closeNewPlaceForm() : prevStep()">
        {{ step === 0 ? "취소" : "이전" }}
      </button>
      <button @click="step === 0 ? nextStep() : addNewPlace(selectedFiles)">
        {{ step === 0 ? "다음" : "완료" }}
      </button>
    </div>
  </div>
  <div v-if="isNewPlaceLoading" class="loading-overlay">
    <div class="loading-message">Loading...</div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import useNewPlace from "@/components/states/useNewPlace";
import uiState from "@/components/states/uiState";

const { isNewPlaceLoading } = uiState;
const {
  changeRating,
  toggleCategory,
  closeNewPlaceForm,
  newPlace,
  addNewPlace,
  step,
  prevStep,
  nextStep,
} = useNewPlace();

const firstInput = ref(null);
const fileInput = ref(null);

const ratingStarIcon = require("@/assets/pixels/rating_star_23px.png");

const selectedFiles = ref([]);
const imageUrls = ref([]);

const categories = ref(["음식", "관광", "모험", "체험", "숙소", "축제"]);

function triggerFileInput() {
  fileInput.value.click();
}

function onFileChange(event) {
  const files = Array.from(event.target.files);
  const newFiles = [];

  files.forEach((file) => {
    if (
      !selectedFiles.value.some(
        (selectedFile) =>
          selectedFile.name === file.name && selectedFile.size === file.size
      )
    ) {
      newFiles.push(file);
    }
  });

  if (selectedFiles.value.length + newFiles.length > 3) {
    alert(
      "사진은 3장 이하로 넣어주세요!\n과한 사진은 여행의 스포일러! (｡•̀ᴗ-)✧"
    );
    return;
  }

  selectedFiles.value = [...selectedFiles.value, ...newFiles];
  imageUrls.value = selectedFiles.value.map((file) =>
    URL.createObjectURL(file)
  );
}

function removeImage(index) {
  imageUrls.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
}

onBeforeUnmount(() => {
  // 컴포넌트가 소멸되기 전에 URL 객체 해제
  console.log("before unmount");
  imageUrls.value.forEach((url) => URL.revokeObjectURL(url));
  firstInput.value = null;
});
</script>

<style scoped>
input,
button,
textarea {
  font-family: "DungGeunMo";
}

textarea {
  resize: none;
}

.new-place-form {
  width: 100%; /* Ensure it takes full width of the parent */
  height: 100%; /* Ensure it takes full height of the parent */
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.step-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.new-place-form > .step-0 {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step-0 input,
.step-0 textarea {
  font-size: 1.5em; /* 원하는 폰트 크기로 조절 */
}

.category-selection {
  display: flex;
  flex-wrap: wrap; /* 가로 스크롤 대신 배지가 여러 줄로 배치되도록 변경 */
  justify-content: center;
  align-items: center;
  gap: 1.1em;
  padding-bottom: 10px; /* 하단 패딩 추가 */
}

.badge {
  cursor: pointer;
  padding: 0.5em 1em;
  border: 1.7px solid #fff;
  border-radius: 4px;
  background-color: #09214f;
  color: white;
  font-size: 1.2em;
  white-space: nowrap; /* 글자를 한 줄로 보이게 설정 */
  text-align: center;
}

.badge.selected {
  border: 1.7px solid #6fd4f6;
  background-color: #2f6caa;
  color: white;
}

.rating {
  display: flex;
  justify-content: center;
  padding-bottom: 3em;
}
.active {
  opacity: 1;
  width: 50px;
  cursor: pointer;
}
.inactive {
  opacity: 0.35;
  width: 50px;
  cursor: pointer;
}

.image-preview {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.preview-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 6em;
}

.file-upload {
  border-radius: 5px;
  border: 2px dashed #ccc;

  font-size: 2em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.file-upload p {
  margin: 10px;
  text-align: center;
}
.file-upload p small {
  font-size: 0.8em;
}

.photos {
  padding-bottom: 10px;
}
.photos img {
  border-radius: 5px;
  border: 2px solid rgb(112, 213, 247);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.remove-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1em;
}

.hidden {
  display: none;
}

.step-change {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-top: 30px;
}

.click-marker-img {
  width: 40px;
  height: 40px;
  filter: invert(28%) sepia(88%) saturate(461%) hue-rotate(140deg)
    brightness(92%) contrast(90%);
}

.step-change button {
  width: 80px;
  height: 40px;
  font-size: 1.2em;
  /* padding: 10px 20px; */
  margin: 10px;
  border-radius: 8px;
  background-color: #2f6caa;
  color: white;
  border: 1.5px solid #6fd4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.step-change button:hover {
  background-color: #1f4c7a; /* 호버 시 배경 색상 */
}

.loading-overlay {
  position: fixed;
  border-radius: 6px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 다른 요소 위에 표시되도록 z-index를 높게 설정 */
}
</style>
