<template>
  <div class="header">
    <SearchBar class="search-bar" />
    <CategorySearchBar class="category-search-bar" />
  </div>
</template>

<script setup>
import SearchBar from "@/components/header/SearchBar.vue";
import CategorySearchBar from "@/components/header/CategorySearchBar.vue";
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  left: 100px;
  gap: 20px;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .header {
    padding: 10px;
    flex-direction: column;
    /* width: 100%; */
    left: 0px;
    gap: 0px;
  }

  .search-bar,
  .category-search-bar {
    width: 100%;
    margin: 10px;
    margin-bottom: 10px;
  }
}
</style>
