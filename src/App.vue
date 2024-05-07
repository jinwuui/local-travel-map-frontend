<template>
  <div>
    <map-component></map-component>
    <sidebar-component></sidebar-component>
    <!-- <test-comp></test-comp> -->
  </div>
</template>

<script>
import MapComponent from "./components/MapComponent.vue";
import SidebarComponent from "./components/SidebarComponent.vue";
// import TestComp from "./components/TestComp.vue";

export default {
  name: "App",
  components: {
    MapComponent,
    SidebarComponent,
    // TestComp,
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
