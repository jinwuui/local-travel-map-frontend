<template>
  <div>
    <MapPage />
    <AppHeader />
    <AppNavBar />
    <AppSideTab />
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";

import MapPage from "@/components/MapPage.vue";
import AppHeader from "@/components/header/AppHeader.vue";
import AppNavBar from "@/components/body/AppNavBar.vue";
import AppSideTab from "@/components/body/AppSideTab.vue";

onBeforeMount(() => {
  document.title = "로-컬 | 숨은 여행지 찾기";
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
</style>
