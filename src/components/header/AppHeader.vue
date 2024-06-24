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
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 20px;
  width: 100%;
  left: 100px;
  gap: 20px;
  box-sizing: border-box;
}

.category-search-bar {
  align-self: flex-start;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .header {
    padding: 10px;
    flex-direction: column;
    /* width: 100%; */
    left: 0px;
    gap: 0px;
    align-items: center;
  }

  .search-bar,
  .category-search-bar {
    width: 100%;
    margin: 10px;
    margin-bottom: 10px;
  }
}
</style>
