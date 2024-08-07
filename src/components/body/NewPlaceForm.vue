<template>
  <div class="new-place-form">
    <div class="step-0 step-content" v-if="step === 0">
      <input
        ref="firstInput"
        :class="{ 'input-error': !nameText && isInvalidInput }"
        v-bind:value="nameText"
        @input="updateName"
        type="text"
        :placeholder="t('new-place.이름')"
      />
      <div v-if="!nameText && isInvalidInput" class="error-message">
        {{ t("new-place.필수 입력입니다") }}
      </div>
      <div class="category-selection">
        <div
          v-for="category in categories"
          :key="category.categoryKey"
          :class="[
            'badge',
            { selected: newPlace.categories.includes(category.categoryKey) },
          ]"
          @click="toggleCategory(category.categoryKey)"
        >
          {{ category.displayName }}
        </div>
      </div>
      <textarea
        :class="{ 'input-error': !descriptionText && isInvalidInput }"
        v-bind:value="descriptionText"
        @input="updateDescription"
        :placeholder="t('new-place.설명')"
        maxlength="100"
      />
      <div v-if="!descriptionText && isInvalidInput" class="error-message">
        {{ t("new-place.필수 입력입니다") }}
      </div>
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
          :class="{ 'too-many-images': isTooManyImages }"
          @click="triggerFileInput"
        >
          <div class="file-upload-text">
            <div>
              {{
                isTooManyImages
                  ? t("new-place.사진 3장 이하로!")
                  : t("new-place.사진")
              }}
            </div>
            <small>{{ selectedFiles.length + " / " + imageLimit }}</small>
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
          <img
            class="remove-badge"
            @click="removeImage(index)"
            :src="removeBadgeIcon"
            alt="Remove Image"
          />
          <img class="photo" :src="url" alt="Image preview" />
        </div>
      </div>
    </div>

    <div class="step-change">
      <button @click="handlePrevStep">
        {{ step === 0 ? t("new-place.취소") : t("new-place.이전") }}
      </button>
      <button @click="handleNextStep">
        {{ step === 0 ? t("new-place.다음") : t("new-place.완료") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { ref, onMounted, onBeforeUnmount } from "vue";
import useNewPlace from "@/components/body/states/useNewPlace";

const {
  nameText,
  descriptionText,
  updateName,
  updateDescription,

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

const ratingStarIcon = require("@/assets/pixels/rating_star.png");
const removeBadgeIcon = require("@/assets/icons/remove-badge.png");

const selectedFiles = ref([]);
const imageUrls = ref([]);
const imageLimit = 3;

const categories = ref([
  { categoryKey: "음식", displayName: t("tag.음식") },
  { categoryKey: "관광", displayName: t("tag.관광") },
  { categoryKey: "모험", displayName: t("tag.모험") },
  { categoryKey: "체험", displayName: t("tag.체험") },
  { categoryKey: "숙소", displayName: t("tag.숙소") },
  { categoryKey: "축제", displayName: t("tag.축제") },
]);

const isInvalidInput = ref(false);
const isTooManyImages = ref(false);

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

  if (selectedFiles.value.length + newFiles.length > imageLimit) {
    isTooManyImages.value = true;
    return;
  } else {
    isTooManyImages.value = false;
  }

  selectedFiles.value = [...selectedFiles.value, ...newFiles];
  imageUrls.value = selectedFiles.value.map((file) =>
    URL.createObjectURL(file)
  );
}

function removeImage(index) {
  if (isTooManyImages.value) isTooManyImages.value = false;

  imageUrls.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
}

function handlePrevStep() {
  if (step.value === 0) {
    closeNewPlaceForm();
  } else {
    setTimeout(() => firstInput.value?.focus(), 0);
    prevStep();
  }
}

function handleNextStep() {
  isInvalidInput.value = true;

  if (step.value === 0 && nameText.value && descriptionText.value) {
    nextStep();
    isInvalidInput.value = false;
  } else if (step.value === 1) {
    addNewPlace(selectedFiles.value);
  }
}

onMounted(() => {
  setTimeout(() => firstInput.value?.focus(), 0);
});

onBeforeUnmount(() => {
  selectedFiles.value = [];
  imageUrls.value.forEach((url) => URL.revokeObjectURL(url));
  firstInput.value = null;
});
</script>

<style scoped>
textarea {
  resize: none;
  height: 6em;
}

.new-place-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px;
  padding-top: 36px;
}

.step-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.new-place-form > .step-0 {
  display: flex;
  flex-direction: column;
  gap: 50px;
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
  box-sizing: border-box;
  height: 6em;
}

.file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: auto;
  border-radius: 5px;
  border: 2px dashed #ccc;
  font-size: 2em;
  cursor: pointer;
}

.file-upload-text {
  margin: 15px;
}

.too-many-images {
  border: 2px dashed red;
  color: red;
}

.photos {
  padding-bottom: 10px;
}
.photos .photo {
  border-radius: 5px;
  border: 2px solid rgb(112, 213, 247);
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.remove-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
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
  width: 6em;
  height: 2.2em;
  font-size: 1.2em;
  /* padding: 10px 20px; */
  margin: 10px;
  border-radius: 8px;
  background-color: #2f6caa;
  color: white;
  border: 1.5px solid #6fd4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap; /* 텍스트 줄 바꿈을 방지합니다. */
  overflow: hidden;
  display: inline-block;
}

.step-change button:hover {
  background-color: #1f4c7a; /* 호버 시 배경 색상 */
}

.sending-overlay {
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
  z-index: 2222;
  font-size: 1.6em;
}

.input-error {
  border: 3px solid red;
  margin-bottom: -50px;
}

.error-message {
  color: red;
  font-size: 13px;
  margin-top: 7px;
  margin-bottom: -22px;
}
</style>
