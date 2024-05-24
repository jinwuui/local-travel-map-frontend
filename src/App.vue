<template>
  <div>
    <MapPage />
    <NavBar />
    <SideTab />
  </div>
</template>

<script>
import MapPage from "@/components/MapPage.vue";
import NavBar from "@/components/NavBar.vue";
import SideTab from "@/components/SideTab.vue";

export default {
  name: "App",
  components: {
    MapPage,
    NavBar,
    SideTab,
  },
};
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

#app {
  font-family: "DungGeunMo", Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}
</style>
