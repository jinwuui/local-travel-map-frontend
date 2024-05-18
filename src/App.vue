<template>
  <div>
    <MapPage />
    <SideMenu />
    <SideTab />
  </div>
</template>

<script>
import MapPage from "@/components/MapPage.vue";
import SideMenu from "@/components/SideMenu.vue";
import SideTab from "@/components/SideTab.vue";

export default {
  name: "App",
  components: {
    MapPage,
    SideMenu,
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
</style>
