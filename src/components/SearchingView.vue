<template>
  <div class="searching-view">
    <ul v-if="searchedPlaces.length > 0" class="searching-list">
      <li
        v-for="(place, index) in searchedPlaces"
        :class="{ 'border-line': index < searchedPlaces.length - 1 }"
        :key="index"
        @mousedown.self="selectPlace(index)"
      >
        <div class="header">
          <h1 class="name">{{ place.name }}</h1>
          <h5 class="country">{{ place.country }}</h5>
        </div>
        <h2 class="description">{{ place.description }}</h2>
      </li>
    </ul>
  </div>
</template>

<script setup>
import useSearching from "@/components/states/useSearching";

const { searchedPlaces, selectPlace } = useSearching();
</script>

<style scoped>
.searching-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.searching-list {
  list-style: none;
  overflow-y: auto;
  width: 100%;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.searching-list li {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
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

.header .name {
  margin: 0;
}

.header .country {
  margin: 0;
  color: lightgrey;
}

.description {
  margin-top: 1em;
}

.searching-list li:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
