<template>
  <div class="detail-info" v-if="selectedPlace != null">
    <img
      class="info-image desktop"
      :src="selectedPlace ? selectedPlace.getFirstPhoto() : defaultPhoto"
      alt="Image"
      @click="openSlider"
    />
    <div class="name">
      <h2>{{ selectedPlace.name }}</h2>
      <h5 v-if="selectedPlace.country">{{ selectedPlace.country }}</h5>
    </div>
    <div class="additional-info">
      <div class="col-div">
        <div class="rating">
          <small>
            {{ selectedPlace.rating != 0 ? selectedPlace.rating : "-" }}
          </small>
          <img
            v-for="number in 5"
            :key="number"
            class="rating-icon"
            :src="
              number <= selectedPlace.rating
                ? ratingActivedIcon
                : ratingInactivedIcon
            "
            alt="star"
          />
        </div>
        <div class="favorite" @click="handleFavorite">
          <img
            class="favorite-icon"
            :class="[selectedPlace.isFavorite ? 'active' : 'inactive']"
            :src="favoriteIcon"
            alt="❤️"
          />
          <div
            class="favorite-text"
            :class="[selectedPlace.isFavorite ? 'active' : 'inactive']"
          >
            저장
          </div>
        </div>
      </div>
      <div class="categories">
        <div
          v-for="category in selectedPlace.categories"
          :key="category"
          class="category-badge"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <p>{{ selectedPlace.description }}</p>
    <img
      class="info-image mobile"
      :src="selectedPlace ? selectedPlace.getFirstPhoto() : defaultPhoto"
      alt="Image"
      @click="openSlider"
    />
  </div>
</template>

<script setup>
import useSelectedPlace from "@/components/body/states/useSelectedPlace";
import useApp from "@/components/states/useApp";
import uiState from "@/components/states/uiState";
import { debounceLeading } from "@/utils/commonUtils";

const { toggleLoginForm } = uiState;
const { selectedPlace, openSlider, toggleFavoritePlace } = useSelectedPlace();
const { loadUser } = useApp();
const debounceToggleFavoritePlace = debounceLeading(toggleFavoritePlace, 400);

const ratingActivedIcon = require("@/assets/pixels/rating_star.png");
const ratingInactivedIcon = require("@/assets/pixels/rating_star_inactived.png");
const favoriteIcon = require("@/assets/pixels/favorite.png");

const defaultPhoto = process.env.VUE_APP_DEFAULT_IMAGE_URL;

function handleFavorite() {
  // 로그인 여부 확인
  if (loadUser()) {
    // 로그인 O -> 즐겨찾기 토글
    debounceToggleFavoritePlace();
  } else {
    // 로그인 X -> 로그인폼 열기
    toggleLoginForm();
  }
}
</script>

<style scoped>
.detail-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  overflow: scroll;
}

.info-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 15px;
}

.info-image.mobile {
  display: none; /* 모바일 이미지를 기본적으로 숨김 */
}

.info-image.desktop {
  display: block; /* 데스크탑 이미지를 기본적으로 표시 */
}

.info-image + .name,
.name + .additional-info,
.additional-info + p {
  border-top: 1.5px solid white;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
}

h5,
h5 + h2 {
  margin: 0;
  margin-top: 10px;
}

h5 {
  color: lightgrey;
}

h2 {
  font-size: 1.6em;
  margin-top: 0px;
  margin-bottom: 0px;
}

.rating {
  display: flex;
  align-items: center;

  margin-top: 0px;
  margin-bottom: 1em;
}

.rating small {
  font-size: 1.2em;
  margin-right: 0.5em;
}

.col-div {
  display: flex;
  justify-content: space-between;
}

.favorite {
  cursor: pointer;
}

.favorite-text {
  position: relative;
  top: -0.5em;
  font-size: 0.8em;
  text-align: center;
  color: #e0e0e0;
}
.active {
  opacity: 1;
}
.inactive {
  opacity: 0.5;
}

.categories {
  display: flex;
  flex-wrap: wrap; /* 스크롤 대신 배지를 여러 줄로 배치 */
  width: fit-content;
  gap: 0.7em;
}

.category-badge {
  padding: 0.5em;
  border-radius: 4px;
  background-color: #2f6caa;
  border: 1.5px solid #6fd4f6;
  text-shadow: 0.85px 0.85px 0 #0f2a50;
}

p {
  font-size: 1.3em;
  margin-top: 0px;
  margin-bottom: 0px;
}

@media (max-width: 768px) {
  .info-image.desktop {
    display: none;
  }

  .info-image.mobile {
    display: block;
  }

  .info-image + .name {
    border-top: 0;
    padding-top: 15px;
    padding-bottom: 30px;
  }

  p {
    border-bottom: 1.5px solid white;
    margin-bottom: 30px;
  }
}
</style>
