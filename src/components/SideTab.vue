<template>
  <div class="tab">
    <img src="../assets/logo.png" alt="Description of the image" />
    <template v-if="selectedPlace != null">
      <p>{{ selectedPlace.name }}</p>
      <p>{{ selectedPlace.rating }}</p>
      <p>{{ selectedPlace.description }}</p>
      <p>{{ selectedPlace.lat }}</p>
      <p>{{ selectedPlace.lng }}</p>
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
import useSelectedPlace from "@/components/states/useSelectedPlace";

const { selectedPlace } = useSelectedPlace();
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
