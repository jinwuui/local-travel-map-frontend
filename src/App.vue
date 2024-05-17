<template>
  <div>
    <MapPage />
    <AppSidebar />
  </div>
</template>

<script>
import MapPage from "@/components/MapPage.vue";
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  name: "App",
  components: {
    MapPage,
    AppSidebar,
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
