<template>
  <div class="announcement-view">
    <div class="announcement-view-header">
      <img
        class="close-button"
        @click="navigateToPreviousComponent"
        :src="close_icon"
        alt="X"
      />
    </div>
    <ul v-if="announcements" class="announcement-list">
      <li
        v-for="(announcement, index) in announcements"
        :class="{ 'border-line': index < announcements.length - 1 }"
        :key="index"
      >
        <div class="header">
          <h2 class="version">{{ announcement.version }}</h2>
          <h2 class="date">{{ announcement.date }}</h2>
        </div>
        <h2 class="content">{{ announcement.content }}</h2>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import uiState from "@/components/states/uiState";
import useNavBar from "@/components/body/states/useNavBar";

const { navigateToPreviousComponent } = uiState;
const { announcements, fetchAnnouncements } = useNavBar();

const close_icon = require("@/assets/pixels/close.png");

onBeforeMount(async () => await fetchAnnouncements());
</script>

<style scoped>
.announcement-view {
  width: 100%;
  height: 100%;
}

.announcement-list {
  list-style: none;
  overflow-y: auto;
  width: 100%;
  z-index: 2222;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.announcement-list li {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
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

.version {
  margin: 0;
  text-shadow: 2.5px 2.5px 0 #111111;
}

.date {
  margin: 0;
  color: lightgrey;
}

.content {
  margin-top: 1em;
  margin-left: 0;
  text-shadow: 2.5px 2.5px 0 #111111;
}

.announcement-view-header {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1.5px solid white;
}

.close-button {
  padding: 8px;
  width: 25px;
  cursor: pointer;
}
</style>
