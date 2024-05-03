<template>
  <div>
    <map-component></map-component>
  </div>
</template>

<script>
import MapComponent from "./components/MapComponent.vue";

export default {
  name: "App",
  components: {
    MapComponent,
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
