<template>
  <div
    v-if="imageSlider.isOpen && imageSlider.imageList.length > 0"
    class="slider-overlay"
    @click.self="closeSlider"
  >
    <div class="move-button">
      <img
        class="prev-button"
        :class="{ inactive: imageSlider.imageList.length <= 1 }"
        @click="prevImage"
        :src="prev_icon"
        alt="&lt;"
      />
    </div>
    <div class="slider-container" @click.self="closeSlider">
      <img
        class="slider-image"
        :src="currentImage.src"
        :srcset="currentImage.srcset"
        :sizes="currentImage.sizes"
        loading="lazy"
        decoding="async"
        alt="Image description"
      />
    </div>
    <img class="close-button" @click="closeSlider" :src="close_icon" alt="X" />
    <div class="move-button">
      <img
        class="next-button"
        :class="{ inactive: imageSlider.imageList.length <= 1 }"
        @click="nextImage"
        :src="next_icon"
        alt="&gt;"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { imageSlider, closeSlider } = useSelectedPlace();

const close_icon = require("@/assets/pixels/close.png");
const prev_icon = require("@/assets/pixels/image_slider_prev.png");
const next_icon = require("@/assets/pixels/image_slider_next.png");

const nextImage = () => {
  imageSlider.index = (imageSlider.index + 1) % imageSlider.imageList.length;
};

const prevImage = () => {
  imageSlider.index =
    (imageSlider.index - 1 + imageSlider.imageList.length) %
    imageSlider.imageList.length;
};

const currentImage = computed(() => {
  const image = imageSlider.imageList[imageSlider.index];

  const srcset = [
    `${image.resizedImageUrl_s} 640w`,
    `${image.resizedImageUrl_m} 1280w`,
    `${image.resizedImageUrl_l} 1920w`,
  ].join(", ");

  const sizes =
    "(max-width: 768px) 85vw, \
  (max-width: 1440px) 90vw, \
  1920px";

  return {
    src: image.resizedImageUrl_m,
    srcset,
    sizes,
  };
});
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
  justify-content: space-between;
  align-items: center;
}

.slider-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

.move-button {
  height: 100%;
  display: flex;
  align-items: center;
}

.close-button,
.prev-button,
.next-button {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.prev-button,
.next-button {
  cursor: pointer;
  padding: 10px;
}

.close-button {
  position: absolute;
  background: transparent;
}

.inactive {
  opacity: 0.25;
}

@media (max-width: 768px) {
  .prev-button,
  .next-button {
    width: 40px;
    height: 40px;
  }

  .close-button {
    top: 30px;
    right: 30px;
  }
}
</style>
