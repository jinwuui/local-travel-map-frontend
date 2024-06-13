<template>
  <div
    v-if="imageSlider.isOpen && imageSlider.imageList.length > 0"
    class="slider-overlay"
    @click.self="closeSlider"
  >
    <div class="slider-container" @click.self="closeSlider">
      <img class="slider-image" :src="currentImage" />
    </div>
    <img class="close-button" @click="closeSlider" :src="close_icon" alt="X" />
    <img
      class="prev-button"
      :class="{ inactive: imageSlider.imageList.length <= 1 }"
      @click="prevImage"
      :src="prev_icon"
      alt="&lt;"
    />
    <img
      class="next-button"
      :class="{ inactive: imageSlider.imageList.length <= 1 }"
      @click="nextImage"
      :src="next_icon"
      alt="&gt;"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { imageSlider, closeSlider } = useSelectedPlace();

const close_icon = require("@/assets/pixels/close.png");
const prev_icon = require("@/assets/pixels/image_slider_prev.png");
const next_icon = require("@/assets/pixels/image_slider_next.png");

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
  top: 20px;
  right: 20px;
}

.prev-button,
.next-button {
  top: 50%;
  transform: translateY(-50%);
}

.close-button,
.prev-button,
.next-button {
  position: absolute;
  background: transparent;
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.prev-button {
  left: 20px;
}

.next-button {
  right: 20px;
}

.close-button img,
.prev-button img,
.next-button img {
  width: 100%;
  height: 100%;
}

.inactive {
  opacity: 0.25;
}
</style>
