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
import { ref } from "vue";
import usePlace from "@/components/states/usePlace";
import { debounce } from "@/utils/commonUtils";

const { fetchPlaces } = usePlace();
const categories = ref(["음식", "관광", "모험", "체험", "숙소", "축제"]);
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
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  top: 2%;
  padding-bottom: 10px;
  left: 500px;
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
</style>
