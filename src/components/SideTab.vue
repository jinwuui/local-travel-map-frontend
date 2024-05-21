<template>
  <div>
    <SearchBar />
    <div class="side-tab" v-if="selectedPlace != null">
      <div class="info-window">
        <img
          src="../assets/dev/mock_image2.jpeg"
          alt="Image"
          class="info-image desktop"
        />
        <h2>{{ selectedPlace.name }}</h2>
        <div class="rating">별점 - {{ selectedPlace.rating }}</div>
        <p>{{ selectedPlace.description }}</p>
        <img
          src="../assets/dev/mock_image3.jpeg"
          alt="Image"
          class="info-image mobile"
        />
      </div>
    </div>
    <div class="side-tab" v-else>
      <div class="info-window">
        <img
          src="../assets/dev/mock_image2.jpeg"
          alt="Image"
          class="info-image desktop"
        />
        <h2>제목 로딩 중...</h2>
        <div class="rating">평점 로딩 중...</div>
        <p>설명 로딩 중...</p>
        <img
          src="../assets/dev/mock_image3.jpeg"
          alt="Image"
          class="info-image mobile"
        />
      </div>
    </div>
    <ul class="comments">
      <li>댓글1</li>
      <li>댓글2</li>
      <li>댓글3</li>
      <li>댓글4</li>
    </ul>
  </div>
</template>

<script setup>
import useSelectedPlace from "@/components/states/useSelectedPlace";
import SearchBar from "@/components/SearchBar.vue";

const { selectedPlace } = useSelectedPlace();
</script>

<style scoped>
.side-tab {
  font-family: "DungGeunMo";

  padding: 2px;
  border-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;

  position: fixed;
  z-index: 1000;
  overflow: hidden;
}

.info-window {
  padding: 16px;
  border: 1.85px solid white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-image {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  /* padding: 0; */
}

.info-image.mobile {
  display: none; /* 모바일 이미지를 기본적으로 숨김 */
}

.info-image.desktop {
  display: block; /* 데스크탑 이미지를 기본적으로 표시 */
}

.border-line {
  border-top: 1.85px solid white;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
}

.info-image + h2,
h2 + .rating,
.rating + p {
  border-top: 1.85px solid white;
  width: 100%;
  padding-top: 20px;
}

h2 {
  font-size: 1.6em;
  margin-top: 10px;
  margin-bottom: 20px;
}

.rating {
  font-size: 1.1em;
  margin-top: 10px;
  margin-bottom: 20px;
}

p {
  font-size: 1.3em;
  margin-top: 10px;
  margin-bottom: 20px;
}

/* Mobile first styles */
.side-tab {
  bottom: 60px;
  left: 10px;
  right: 10px;
  width: auto;
  max-width: 100%;
}

/* Desktop styles */
@media (min-width: 769px) {
  .side-tab {
    bottom: 3%;
    top: 9%;
    left: 100px; /* 네비게이션에서 살짝 오른쪽에 떨어진 곳 */
    right: auto;
    width: 300px;
    max-width: none;
  }

  .info-window {
    height: 100%;
    box-sizing: border-box;
  }
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
