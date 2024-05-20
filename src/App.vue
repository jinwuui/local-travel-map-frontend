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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: "DungGeunMo";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
