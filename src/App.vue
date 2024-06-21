<template>
  <div>
    <div class="mobile-warning">
      <h1>모바일 버전은<br />곧 공개됩니다</h1>
      <h2>데스크탑 환경에서 여행지를 만나보세요.</h2>
    </div>
    <div class="main-content">
      <MapPage />
      <AppHeader />
      <AppNavBar />
      <AppSideTab />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";

import MapPage from "@/components/MapPage.vue";
import AppHeader from "@/components/header/AppHeader.vue";
import AppNavBar from "@/components/body/AppNavBar.vue";
import AppSideTab from "@/components/body/AppSideTab.vue";

onBeforeMount(() => {
  document.title = "로-컬 | 숨은 여행지 찾기";
});

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  console.log(window.innerWidth);
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
</script>

<style>
@font-face {
  font-family: "DungGeunMo";
  src: url("./assets/fonts/DungGeunMo.woff2") format("woff2"),
    url("./assets/fonts/DungGeunMo.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  /* font-display: swap; */
}

@font-face {
  font-family: "DOSIyagiBoldface";
  src: url("./assets/fonts/DOSIyagiBoldface.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "DNFBitBitv2";
  src: url("./assets/fonts/DNFBitBitv2.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "DungGeunMo", "DOSIyagiBoldface", "DNFBitBitv2", Avenir,
    Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}

.mobile-warning {
  display: none;
}

.main-content {
  display: block;
}

@media (max-width: 768px) {
  .mobile-warning {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    padding: 20px;
    background-color: #f8d7da;
    color: #721c24;
    font-family: "DOSIyagiBoldface", "DungGeunMo", "DNFBitBitv2", Avenir,
      Helvetica, Arial, sans-serif;
  }

  .main-content {
    display: none;
  }
}
</style>
