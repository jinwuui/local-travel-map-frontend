<template>
  <div v-if="false" class="slider-overlay" @click.self="closeSlider">
    <div class="slider-container">
      <button class="close-button" @click="closeSlider">X</button>
      <button class="prev-button" @click="prevImage">&lt;</button>
      <img src="../assets/dev/mock_image1.jpeg" class="slider-image" />
      <button class="next-button" @click="nextImage">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const isOpen = ref(false);
const images = ref([]);
const currentIndex = ref(0);

const openSlider = (imageList) => {
  images.value = imageList;
  currentIndex.value = 0;
  isOpen.value = true;
};

const closeSlider = () => {
  isOpen.value = false;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// const currentImage = computed(
//   () =>
//     process.env.VUE_APP_ORIGIN_IMAGE_URL +
//     images.value[currentIndex.value].filename
// );

defineExpose({ openSlider });
</script>

<style scoped>
.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 800;
}

.slider-container {
  left: 434px;
  width: calc(100% - 434px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  object-fit: cover;
  object-position: center;
}
</style>
