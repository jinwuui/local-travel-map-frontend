<template>
  <div :class="{ sidebar: true, 'is-open': isOpen }">
    <h1>🏠</h1>
    <ul>
      <li><a href="#">저장</a></li>
      <li><a href="#">최근</a></li>
      <li><a href="#">설정</a></li>
      <li><a href="#">공지</a></li>
    </ul>
  </div>
  <SelectedPlaceTab />
</template>

<script setup>
import { ref } from "vue";
import SelectedPlaceTab from "./SelectedPlaceTab.vue";

const isOpen = ref(true);
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;

  width: 50px;
  padding: 10px;
  height: 100vh;

  position: fixed;
  left: 0;
  top: 0;

  background-color: grey;
  align-items: center;
  z-index: 1000;
}
.sidebar h1 {
  margin: 0;
  margin-top: 20px;
  margin-bottom: 30px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
