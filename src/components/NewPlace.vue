<template>
  <CustomMarker
    :options="{
      position: { lat: newPlace.lat, lng: newPlace.lng },
      anchorPoint: 'BOTTOM_CENTER',
    }"
    @click.stop
  >
    <div class="new-place">
      <div class="step-title">
        <div class="step-title-text">
          {{ step === 0 ? "등록하기" : "추가선택" }}
        </div>
      </div>

      <div class="new-place-border">
        <div class="new-place-form">
          <div class="step-0 step-content" v-if="step === 0">
            <input
              ref="firstInput"
              type="text"
              placeholder="이름"
              v-model="newPlace.name"
              v-on:click.stop="maintainFocus"
            />
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
              v-on:click.stop="maintainFocus"
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
              <div
                class="preview-container file-upload"
                @click="triggerFileInput"
              >
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
                <img :src="url" alt="Image preview" />
              </div>
            </div>
          </div>

          <div class="step-change">
            <button @click="step === 0 ? closeForm() : prevStep()">
              {{ step === 0 ? "취소" : "이전" }}
            </button>
            <button
              @click="step === 0 ? nextStep() : addNewPlace(selectedFiles)"
            >
              {{ step === 0 ? "다음" : "완료" }}
            </button>
          </div>
        </div>
      </div>
      <img class="click-marker-img" :src="markerIcon" />
    </div>
  </CustomMarker>
</template>

<script setup>
import { ref, onMounted, onUpdated, onBeforeUnmount } from "vue";
import { CustomMarker } from "vue3-google-map";
import useNewPlace from "@/components/states/useNewPlace";

const {
  changeRating,
  toggleCategory,
  closeForm,
  newPlace,
  addNewPlace,
  step,
  prevStep,
  nextStep,
} = useNewPlace();

const firstInput = ref(null);
const fileInput = ref(null);

const markerIcon = require("@/assets/test.png");
const ratingStarIcon = require("@/assets/pixels/rating_star_23px.png");

const selectedFiles = ref([]);
const imageUrls = ref([]);

const categories = ref(["음식", "관광", "모험", "체험", "숙소", "축제"]);

function triggerFileInput() {
  fileInput.value.click();
}

function onFileChange(event) {
  const files = Array.from(event.target.files);

  if (files.length > 3) {
    alert(
      "사진은 3장 이하로 넣어주세요!\n과한 사진은 여행의 스포일러! (｡•̀ᴗ-)✧"
    );
    return;
  }

  selectedFiles.value = files;
  imageUrls.value = files.map((file) => URL.createObjectURL(file));
}

const maintainFocus = (event) => event.target.focus();

onMounted(() => {
  setTimeout(() => firstInput.value?.focus(), 0);
});

onUpdated(() => {
  setTimeout(() => firstInput.value?.focus(), 0);
});

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
  font-family: "DungGeunMo", sans-serif;
}

.new-place {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #111; */
}

.new-place-border {
  font-family: "DungGeunMo";
  padding: 2px;
  border-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  overflow: auto;
}

.new-place-form {
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

.step-title {
  width: 40%;
  display: flex;
  justify-content: center;
  font-family: "DungGeunMo";
  font-size: 1.3em;

  padding: 2px;
  padding-bottom: 0px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  overflow: auto;
}

.step-title-text {
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

.step-content {
  height: 170px; /* 원하는 높이로 설정 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.new-place-form > .step-0 {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  gap: 10px;
  padding-bottom: 10px; /* 하단 패딩 추가 */
}

.badge {
  cursor: pointer;
  padding: 0.5em 1em;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: #09214f;
  color: white;
  font-size: 1.2em;
  white-space: nowrap; /* 글자를 한 줄로 보이게 설정 */
  text-align: center;
}

.badge.selected {
  border: 1px solid #6fd4f6;
  background-color: #2f6caa;
  color: white;
}

.rating {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}
.active {
  opacity: 1;
  width: 35px;
}
.inactive {
  opacity: 0.35;
  width: 35px;
}

.image-preview {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
}

.preview-container {
  display: flex;
  flex-direction: row;
  height: 4rem;
  width: 4rem;

  flex: 0 0 auto;
  margin-right: 10px;
}

.preview-container p {
  margin: 0;
  text-align: center;
}

.preview-container p small {
  font-size: 0.8em;
}

.file-upload {
  border-radius: 5px;
  border: 2px dashed #ccc;

  font-size: 2em;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.photos img {
  border-radius: 5px;
  border: 2px solid rgb(112, 213, 247);
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
  min-height: 4rem;
  object-fit: cover;
  object-position: center;
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
</style>
