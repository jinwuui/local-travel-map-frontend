<template>
  <div class="favorite-view">
    <ul v-if="favoritePlaces.length > 0" class="favorite-list">
      <li
        v-for="(place, index) in favoritePlaces"
        :class="{ 'border-line': index < favoritePlaces.length - 1 }"
        :key="index"
        @mousedown="selectPlaceById(place.placeId)"
      >
        <div class="header">
          <h1 class="name">{{ place.name }}</h1>
          <h5 class="country">{{ place.country }}</h5>
        </div>
        <h2 class="description">{{ place.description }}</h2>
        <div class="photos">
          <img
            v-for="(photo, photoIndex) in place.photos"
            :src="imageSrc(photo.filename)"
            :key="photoIndex"
            class="photo"
            :class="{
              first: photoIndex === 0,
              last: photoIndex === place.photos.length - 1,
            }"
          />
        </div>
      </li>
    </ul>
    <div v-else class="no-results">
      <h2 class="no-results-message">즐겨찾기된 장소가 없습니다</h2>
      <img class="no-results-img" :src="noResultsImage" alert="ㅠㅠ" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import useNavBar from "@/components/body/states/useNavBar";
import useSelectedPlace from "@/components/body/states/useSelectedPlace";

const { favoritePlaces, fetchFavoritePlaces } = useNavBar();
const { selectPlaceById } = useSelectedPlace();
const noResultsImage = require("@/assets/pixelarts/no-results-image.png");

onMounted(async () => await fetchFavoritePlaces());

function imageSrc(filename) {
  return process.env.VUE_APP_ORIGIN_IMAGE_URL + filename;
}
</script>

<style scoped>
.favorite-view {
  width: 100%;
  height: 100%;
}

.favorite-list {
  list-style: none;
  overflow-y: auto;
  width: 100%;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.favorite-list li {
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
  border-bottom: 1.85px solid white;
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
}

.favorite-list li:hover {
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

.photos {
  display: flex;
  width: 100%;
  gap: 3px;
}
.photo {
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
