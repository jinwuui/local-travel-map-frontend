<template>
  <div class="searching-view">
    <ul
      v-if="searchedPlaces && searchedPlaces.length > 0"
      class="searching-list"
    >
      <li
        v-for="(place, index) in searchedPlaces"
        :class="{ 'border-line': index < searchedPlaces.length - 1 }"
        :key="index"
        @mousedown="selectPlace(index)"
      >
        <div class="header">
          <h2 class="name">{{ place.name }}</h2>
          <h5 class="country">{{ place.country }}</h5>
        </div>
        <h3 class="description">{{ place.description }}</h3>
      </li>
    </ul>
    <div v-else-if="!isSideTabLoading" class="no-results">
      <h2 class="no-results-message">
        {{ t("search.검색된 장소가 없습니다") }}
      </h2>
      <img class="no-results-img" :src="noResultsImage" alert="ㅠㅠ" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import useSearching from "@/components/body/states/useSearching";
import uiState from "@/components/states/uiState";

const { isSideTabLoading } = uiState;
const { searchedPlaces, selectPlace } = useSearching();
const noResultsImage = require("@/assets/pixelarts/no-results-image.jpeg");
</script>

<style scoped>
.searching-view {
  width: 100%;
  height: 100%;
}

.searching-list {
  list-style: none;
  overflow-y: auto;
  width: 100%;
  z-index: 2222;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.searching-list li {
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
  flex-shrink: 1;
}

.country {
  margin: 0;
  color: lightgrey;
  white-space: nowrap;
  margin-left: 10px;
}

.description {
  margin-top: 1em;
  text-shadow: 2.5px 2.5px 0 #111111;
}

.searching-list li:hover {
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
</style>
