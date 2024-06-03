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
    <div class="rating-and-category">
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
              : ratingUnactivedIcon
          "
          alt="star"
        />
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
  <div class="detail-info" v-else>
    <img :src="defaultPhoto" alt="Image" class="info-image desktop" />
    <h2>제목 로딩 중...</h2>
    <div class="rating-and-category">
      <div class="rating">
        <small>평점 로딩 중...</small>
      </div>
    </div>
    <p>설명 로딩 중...</p>
    <img :src="defaultPhoto" alt="Image" class="info-image mobile" />
  </div>
</template>

<script setup>
import useSelectedPlace from "@/components/states/useSelectedPlace";

const { selectedPlace, openSlider } = useSelectedPlace();

const ratingActivedIcon = require("@/assets/pixels/rating_star_23px.png");
const ratingUnactivedIcon = require("@/assets/pixels/rating_star_unactived_23px.png");

const defaultPhoto = process.env.VUE_APP_DEFAULT_IMAGE_URL;
</script>

<style scoped>
.detail-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
.name + .rating-and-category,
.rating-and-category + p {
  border-top: 1.85px solid white;
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
    display: none; /* 데스크탑 이미지를 모바일에서는 숨김 */
  }

  .info-image.mobile {
    display: block; /* 모바일 이미지를 모바일에서는 표시 */
  }
}
</style>
