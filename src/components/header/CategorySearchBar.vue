<template>
  <div class="category-selection">
    <div
      v-for="category in categories"
      :key="category"
      class="category-badge"
      :class="{ selected: selectedCategory === category }"
      @click="fetchByCategory(category)"
    >
      <p>{{ category }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { ref } from "vue";
import usePlace from "@/components/states/usePlace";
import { debounce } from "@/utils/commonUtils";

const { fetchPlaces } = usePlace();
const categories = ref([
  t("tag.음식"),
  t("tag.관광"),
  t("tag.모험"),
  t("tag.체험"),
  t("tag.숙소"),
  t("tag.축제"),
]);
const selectedCategory = ref(null);
const debounceFetchPlaces = debounce(fetchPlaces, 400);

async function fetchByCategory(category) {
  let params = null;

  if (category !== selectedCategory.value) {
    selectedCategory.value = category;
    params = { category: category };
  } else {
    selectedCategory.value = null;
  }

  debounceFetchPlaces(params);
}
</script>

<style scoped>
.category-selection {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  top: 2%;
  padding-bottom: 10px;
}

.category-badge {
  display: inline-block;
  padding: 0.3em 0.8em;
  background-color: #4caf50;
  border: 2.3px solid #388e3c;
  border-radius: 7px;
  box-shadow: 0 4px #2e7d32;
  color: #fff;
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0 #2e7d32;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
  white-space: nowrap;
}

.category-badge:hover {
  background-color: #43a047;
}

.category-badge:active {
  transform: translateY(3px);
  box-shadow: 0 2px #2e7d32;
}

.category-badge > p {
  margin: 0;
}

.selected {
  transform: translateY(3px);
  background-color: #43a047;
  box-shadow: 0 2px #2e7d32;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .category-selection {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 75px;
    left: 0;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .category-selection::-webkit-scrollbar {
    display: none;
  }

  .category-badge {
    font-size: 1em;
    padding: 0.2em 0.6em;
    white-space: nowrap;
    margin-right: 0.05em;
  }
}
</style>
