<template>
  <div class="bookmark-view">
    <ul v-if="bookmarkPlaces.length > 0" class="bookmark-list">
      <li
        v-for="(place, index) in bookmarkPlaces"
        :class="{ 'border-line': index < bookmarkPlaces.length - 1 }"
        :key="index"
        @mousedown="selectPlaceById(place.placeId)"
      >
        <div class="header">
          <h2 class="name">{{ place.name }}</h2>
          <h5 class="country">{{ place.country }}</h5>
        </div>
        <h3 class="description">{{ place.description }}</h3>
        <div class="images">
          <img
            v-for="(imageUrl, imageIndex) in place.imageUrls"
            :src="imageUrl.resizedImageUrl_t"
            :key="imageIndex"
            class="image"
            :class="{
              first: imageIndex === 0,
              last: imageIndex === place.imageUrls.length - 1,
            }"
            loading="lazy"
            decoding="async"
          />
        </div>
      </li>
    </ul>
    <div v-else class="no-results">
      <h2 class="no-results-message">
        {{ t("navbar.즐겨찾기된 장소가 없습니다") }}
      </h2>
      <img class="no-results-img" :src="noResultsImage" alert="ㅠㅠ" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useToast, POSITION } from "vue-toastification";
import { onMounted } from "vue";
import useNavBar from "@/components/body/states/useNavBar";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const toast = useToast();

const { bookmarkPlaces, fetchBookmarkPlaces } = useNavBar();
const { selectPlaceById } = useSelectedPlace();
const noResultsImage = require("@/assets/pixelarts/no-results-image.jpeg");

onMounted(
  async () =>
    await fetchBookmarkPlaces().catch(() =>
      toast.error(t("로그인이 필요합니다"), {
        position: POSITION.TOP_CENTER,
        timeout: 2000,
      })
    )
);
</script>

<style scoped>
.bookmark-view {
  width: 100%;
  height: 100%;
}

.bookmark-list {
  list-style: none;
  overflow-y: auto;
  width: 100%;
  z-index: 2222;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.bookmark-list li {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.border-line {
  border-bottom: 1.5px solid white;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.name {
  margin: 0;
  text-shadow: 2.5px 2.5px 0 #111111;
}

.country {
  margin: 0;
  color: lightgrey;
}

.description {
  margin-top: 1em;
  text-shadow: 2.5px 2.5px 0 #111111;
  line-height: 1.2;
}

.bookmark-list li:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.no-results {
  padding: 16px;
}

.no-results-message {
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.no-results-img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.images {
  display: flex;
  width: 100%;
  gap: 3px;
}
.image {
  display: block;
  width: calc(100% / 3 - 6px);
  height: 111px;
  object-fit: cover;
  flex-shrink: 0;
  flex-grow: 1;
}

.first {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.last {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
