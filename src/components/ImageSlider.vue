<template>
  <div
    v-if="imageSlider.isOpen"
    class="slider-overlay"
    @click.self="closeSlider"
  >
    <div class="slider-container" @click.self="closeSlider">
      <button class="close-button" @click="closeSlider">X</button>
      <button class="prev-button" @click="prevImage">&lt;</button>
      <img :src="currentImage" class="slider-image" />
      <button class="next-button" @click="nextImage">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useSelectedPlace from "./states/useSelectedPlace";

const { imageSlider, closeSlider } = useSelectedPlace();

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % imageSlider.imageList.length;
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + imageSlider.imageList.length) %
    imageSlider.imageList.length;
};

const currentImage = computed(
  () =>
    process.env.VUE_APP_ORIGIN_IMAGE_URL +
    imageSlider.imageList[currentIndex.value].filename
);
</script>

<style scoped>
.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.slider-container {
  position: relative;
  top: 0;
  left: 474px;
  width: calc(100% - 474px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 36px;
  cursor: pointer;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.slider-image {
  max-width: 80%;
  max-height: 80%;
  min-width: 50vw; /* 최소 너비를 뷰포트 너비의 50%로 설정 */
  min-height: 50vh; /* 최소 높이를 뷰포트 높이의 50%로 설정 */
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
}
</style>
