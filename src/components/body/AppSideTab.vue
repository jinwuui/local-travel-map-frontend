<template>
  <div>
    <ImageSlider />
    <div class="side-tab" :class="{ 'side-tab-hidden': !isSideTabOpen }">
      <div class="side-tab-border">
        <component :is="activeTabComponent" />
      </div>
      <div class="tab-toggle-btn" @click="toggleSideTab">
        <div class="tab-toggle-btn-border">
          <p>{{ isSideTabOpen ? "<" : ">" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ImageSlider from "@/components/body/ImageSlider.vue";

import DefaultView from "@/components/body/DefaultView.vue";
import NewPlaceForm from "@/components/body/NewPlaceForm.vue";
import PlaceDetailView from "@/components/body/PlaceDetailView.vue";
import AnnouncementView from "@/components/body/AnnouncementView.vue";
import FeedbackForm from "@/components/body/FeedbackForm.vue";
import SearchingView from "@/components/body/SearchingView";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";

const { isSideTabOpen, toggleSideTab, activeSideTab } = uiState;

const tabComponents = {
  [COMPONENT_NAMES.DEFAULT_VIEW]: DefaultView,
  [COMPONENT_NAMES.NEW_PLACE_FORM]: NewPlaceForm,
  [COMPONENT_NAMES.PLACE_DETAIL_VIEW]: PlaceDetailView,
  [COMPONENT_NAMES.ANNOUNCEMENT_VIEW]: AnnouncementView,
  [COMPONENT_NAMES.FEEDBACK_FORM]: FeedbackForm,
  [COMPONENT_NAMES.SEARCHING_VIEW]: SearchingView,
};

const activeTabComponent = computed(() => tabComponents[activeSideTab.value]);
</script>

<style scoped>
.side-tab {
  font-family: "DungGeunMo";

  padding: 2px;
  border-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  transition: transform 0.3s ease;
  transform: translateX(0);
  position: fixed;
  z-index: 2000;

  bottom: 60px;
  left: 10px;
  right: 10px;
  width: auto;
  max-width: 100%;

  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.5) transparent; /* For Firefox */
}

.side-tab-hidden {
  transform: translateX(-374px);
  transition: transform 0.3s ease;
}

.side-tab-border {
  border: 1.85px solid white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; /* Ensure it takes full height */
  box-sizing: border-box;
  overflow: auto;
}

.side-tab::-webkit-scrollbar {
  width: 4px;
  background-color: transparent; /* Scrollbar background color */
}
.side-tab::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5); /* Scrollbar thumb color */
  border-radius: 4px;
}
.side-tab::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7); /* Scrollbar thumb hover color */
}
.side-tab::-webkit-scrollbar-track {
  background-color: transparent; /* Scrollbar track background color */
}

.tab-toggle-btn {
  position: relative;
  background-color: rgb(35, 54, 80);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  left: 100%;
  bottom: calc(50% + 30px);
  padding: 2px;
  width: 20px;
  height: 60px;
  display: flex;
  cursor: pointer;
  z-index: 800;
}

.tab-toggle-btn-border {
  position: inherit;
  border-right: 1.85px solid white;
  border-top: 1.85px solid white;
  border-bottom: 1.85px solid white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Desktop styles */
@media (min-width: 769px) {
  .side-tab {
    bottom: 3%;
    top: 9%;
    left: 100px; /* 네비게이션에서 살짝 오른쪽에 떨어진 곳 */
    right: auto;
    width: 350px;
    max-width: none;
  }

  .side-tab-border {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
