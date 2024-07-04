<template>
  <div>
    <ImageSlider />
    <div
      class="side-tab"
      :class="{
        'side-tab-hidden': !isSideTabOpen,
      }"
      :style="isMobile ? { height: sideTabHeight + 'px' } : {}"
    >
      <div class="side-tab-border">
        <component :is="activeTabComponent" />
      </div>
      <div class="tab-toggle-btn" @click="toggleSideTab" @mousedown="startDrag">
        <div class="tab-toggle-btn-border">
          <p>
            {{ isSideTabOpen ? (isMobile ? "∨" : "<") : isMobile ? "∧" : ">" }}
          </p>
        </div>
      </div>
      <div v-if="isSideTabLoading" class="sending-overlay">
        {{ t("side-tab.로딩") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import ImageSlider from "@/components/body/ImageSlider.vue";

import DefaultView from "@/components/body/DefaultView.vue";
import NewPlaceForm from "@/components/body/NewPlaceForm.vue";
import PlaceDetailView from "@/components/body/PlaceDetailView.vue";
import SearchingView from "@/components/body/SearchingView";
import FavoriteView from "@/components/body/FavoriteView";
import AnnouncementView from "@/components/body/AnnouncementView.vue";
import FeedbackForm from "@/components/body/FeedbackForm.vue";

import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";

const {
  isMobile,
  isSideTabOpen,
  isSideTabLoading,
  toggleSideTab,
  activeSideTab,
} = uiState;

const tabComponents = {
  [COMPONENT_NAMES.DEFAULT_VIEW]: DefaultView,
  [COMPONENT_NAMES.NEW_PLACE_FORM]: NewPlaceForm,
  [COMPONENT_NAMES.PLACE_DETAIL_VIEW]: PlaceDetailView,
  [COMPONENT_NAMES.SEARCHING_VIEW]: SearchingView,
  [COMPONENT_NAMES.FAVORITE_VIEW]: FavoriteView,
  [COMPONENT_NAMES.ANNOUNCEMENT_VIEW]: AnnouncementView,
  [COMPONENT_NAMES.FEEDBACK_FORM]: FeedbackForm,
};

const activeTabComponent = computed(() => tabComponents[activeSideTab.value]);

const sideTabHeight = ref(window.innerHeight * 0.37);
const maxTabHeight = ref(window.innerHeight * 0.8);
let startY = 0;
let startHeight = 0;

function startDrag(event) {
  event.preventDefault();
  event.stopPropagation();

  startY = event.clientY;
  startHeight = sideTabHeight.value;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(event) {
  event.preventDefault();
  event.stopPropagation();

  const deltaY = event.clientY - startY;
  const newHeight = Math.min(maxTabHeight, Math.max(200, startHeight + deltaY));

  if (isSideTabOpen.value) {
    if (sideTabHeight.value > 300 && deltaY > 50) {
      sideTabHeight.value = 300;
    } else if (sideTabHeight.value <= 310 && deltaY > 50) {
      toggleSideTab();
    } else {
      sideTabHeight.value = newHeight;
    }
  } else if (!isSideTabOpen.value && deltaY < -50) {
    toggleSideTab();
  }
}

function stopDrag(event) {
  event.preventDefault();
  event.stopPropagation();

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

watch(isSideTabOpen, (newValue) => {
  if (!newValue) {
    sideTabHeight.value = window.innerHeight * 0.37; // 화면의 1/3로 설정
  }
});

onMounted(() => {
  sideTabHeight.value = window.innerHeight * 0.37; // 화면의 1/3로 설정
  document.addEventListener("mouseup", stopDrag);
});

onUnmounted(() => {
  document.removeEventListener("mouseup", stopDrag);
});
</script>

<style scoped>
.side-tab {
  padding: 2px;
  border-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  transition: transform 0.3s ease;
  transform: translateX(0);
  position: fixed;
  z-index: 2000;
  bottom: 3%;
  top: 10%;
  left: 100px; /* 네비게이션에서 살짝 오른쪽에 떨어진 곳 */
  right: auto;
  width: 350px;
  max-width: none;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.5) transparent; /* For Firefox */
}

.side-tab-hidden {
  transform: translateX(-374px);
  transition: transform 0.3s ease;
}

.side-tab-border {
  border: 1.5px solid white;
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
  background-color: transparent;
}

.side-tab::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.side-tab::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.side-tab::-webkit-scrollbar-track {
  background-color: transparent;
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
  border-right: 1.5px solid white;
  border-top: 1.5px solid white;
  border-bottom: 1.5px solid white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.sending-overlay {
  position: fixed;
  border-radius: 6px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2222;
  font-size: 1.6em;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .side-tab {
    bottom: 60px;
    top: auto;
    left: 10px;
    right: 10px;
    width: auto;
    max-width: 100%;
    height: 300px;
    transform: translateY(0);
    transition: transform 0.3s ease;
    resize: none;
  }

  .side-tab-hidden {
    transform: translateY(calc(100% + 10px));
  }

  .side-tab-border {
    height: 100%;
    box-sizing: border-box;
  }
  .tab-toggle-btn {
    position: fixed;
    left: calc(50% - 40px);
    top: calc(-31px);
    box-sizing: border-box;
    height: 33px;
    width: 80px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    padding-bottom: 0px;
    margin-bottom: 10px;
    padding-bottom: 2px;
    /* cursor: ns-resize; */
  }

  .tab-toggle-btn-border {
    position: relative;
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-right: 1.5px solid white;
    border-top: 1.5px solid white;
    border-left: 1.5px solid white;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  .side-tab::-webkit-scrollbar {
    display: none;
  }
}
</style>
