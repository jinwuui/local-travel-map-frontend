<template>
  <div
    v-if="imageSlider.isOpen"
    class="slider-overlay"
    @click.self="closeSlider"
  >
    <div class="slider-container" @click.self="closeSlider">
      <img class="slider-image" :src="currentImage" />
    </div>
    <button class="close-button" @click="closeSlider">X</button>
    <button class="prev-button" @click="prevImage">&lt;</button>
    <button class="next-button" @click="nextImage">&gt;</button>
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
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1200px; /* 최대 너비 설정 */
  padding: 20px;
  border-radius: 10px;
}
.slider-image {
  max-width: 100%;
  max-height: 80vh;
  min-width: 50vw;
  min-height: 50vh;
  object-fit: contain;
  object-position: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  width: 100px;
  height: 100px;
  font-size: 60px;
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
  width: 100px;
  height: 100px;
  font-size: 60px;
  cursor: pointer;
}

.prev-button {
  left: 0;
}

.next-button {
  right: 0;
}
</style>
