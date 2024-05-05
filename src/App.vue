<template>
  <div>
    <map-component></map-component>
    <sidebar-component></sidebar-component>
  </div>
</template>

<script>
import MapComponent from "./components/MapComponent.vue";
import SidebarComponent from "./components/SidebarComponent.vue";

export default {
  name: "App",
  components: {
    MapComponent,
    SidebarComponent,
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
