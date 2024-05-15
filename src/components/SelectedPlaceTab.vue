<template>
  <div class="tab">
    <img src="../assets/logo.png" alt="Description of the image" />
    <template v-if="selectedPlace.value != null">
      <p>{{ selectedPlace.value.name }}</p>
      <p>{{ selectedPlace.value.rating }}</p>
      <p>{{ selectedPlace.value.description }}</p>
      <p>{{ selectedPlace.value.lat }}</p>
      <p>{{ selectedPlace.value.lng }}</p>
    </template>
    <ul class="comments">
      <li>댓글1</li>
      <li>댓글2</li>
      <li>댓글3</li>
      <li>댓글4</li>
    </ul>
  </div>
</template>

<script setup>
// import { computed, watch } from "vue";
import { selectedPlace } from "./states/selected-place";

// const place = computed(() => state.selectedPlace);
// const details = computed(() => state.placeDetails);

// watch(place, (newPlace) => {
//   console.log("place updated:", newPlace);
// });

// watch(details, (newDetails) => {
//   console.log("details updated:", newDetails);
// });
</script>

<style>
.tab {
  display: flex;
  flex-direction: column;

  width: 430px;
  padding: 10px;
  height: 100vh;

  position: fixed;
  left: 0;
  top: 0;

  background-color: green;
  align-items: center;
}
</style>
