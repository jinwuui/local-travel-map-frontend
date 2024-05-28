<template>
  <div>
    <SearchBar />
    <ImageSlider ref="imageSlider" />
    <div class="side-tab" :class="{ 'side-tab-hidden': isSideTabHidden }">
      <div class="side-tab-border">
        <NewPlaceForm v-if="isFormOpen" />
        <PlaceDetailView v-else />
      </div>
      <div class="tab-toggle-btn" @click="toggleSideTab">
        <div class="tab-toggle-btn-border">
          <p>{{ isSideTabHidden ? ">" : "<" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import useNewPlace from "@/components/states/useNewPlace";
import SearchBar from "@/components/SearchBar.vue";
import ImageSlider from "@/components/ImageSlider.vue";
import NewPlaceForm from "@/components/NewPlaceForm.vue";
import PlaceDetailView from "@/components/PlaceDetailView.vue";

const { isFormOpen } = useNewPlace();

const isSideTabHidden = ref(false);

const toggleSideTab = () => {
  isSideTabHidden.value = !isSideTabHidden.value;
};
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
}

.side-tab-hidden {
  transform: translateX(-354px);
  transition: transform 0.3s ease;
}

.side-tab-border {
  padding: 16px;
  border: 1.85px solid white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; /* Ensure it takes full height */
  box-sizing: border-box;
  overflow: auto; /* Ensure content inside can scroll if it overflows */
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
    width: 330px;
    max-width: none;
  }

  .side-tab-border {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
