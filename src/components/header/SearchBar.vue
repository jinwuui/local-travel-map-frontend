<template>
  <div ref="searchBarRef" class="search-bar">
    <div class="search-bar-border">
      <div class="search-input-container">
        <input
          :class="[
            'search-input',
            suggestions.length > 0 ? 'with-autocomplete' : '',
          ]"
          ref="inputRef"
          v-bind:value="inputText"
          @input="handleInput"
          @keydown="handleKeydown"
          @search="handleSearch"
          @focus="autocomplete(inputText)"
          type="text"
          placeholder="검색어를 입력하세요..."
        />
        <img
          v-if="isSearchingViewOpen"
          class="close-button"
          @click="navigateToPreviousComponent"
          :src="close_icon"
          alt="X"
        />
      </div>
      <ul
        v-if="suggestions.length > 0"
        class="autocomplete-list"
        @mouseout="setSelectedIndex(-1)"
      >
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          :class="{
            selected: index === selectedIndex,
            recent: suggestion.type === 'recent',
          }"
          @mouseenter="setSelectedIndex(index)"
          @mousedown.self="handleSelectSuggestion"
        >
          {{ suggestion.name }}
          <span
            v-if="suggestion.type === 'recent'"
            class="delete-history-button"
            @click.stop="deleteSearchHistory(index)"
          >
            X
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useSearch from "@/components/header/states/useSearch";
import { debounce } from "@/utils/commonUtils";

const { activeSideTab, navigateToPreviousComponent } = uiState;

const {
  loadSearchHistory,
  deleteSearchHistory,

  inputText,
  inputRef,
  setInputText,
  autocomplete,

  suggestions,
  clearSuggestions,

  searching,
  isEnableSearching,

  selectedIndex,
  setSelectedIndex,
} = useSearch();

const close_icon = require("@/assets/pixels/close.png");

const searchBarRef = ref(null);
const debounceAutocomplete = debounce(autocomplete, 300);
const isSearchingViewOpen = computed(
  () => activeSideTab.value === COMPONENT_NAMES.SEARCHING_VIEW
);

onMounted(() => {
  loadSearchHistory();
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function handleClickOutside(event) {
  if (searchBarRef.value && !searchBarRef.value.contains(event.target)) {
    // 클릭이 searchBarRef 외부에서 발생한 경우
    setTimeout(() => {
      clearSuggestions();
    }, 100);
  }
}

function handleInput(event) {
  setInputText(event.target.value);
  debounceAutocomplete(event.target.value);
}

function handleKeydown(event) {
  // 한글 IME 입력 문제
  if (event.isComposing || event.keyCode === 229) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    setSelectedIndex(selectedIndex.value + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setSelectedIndex(selectedIndex.value - 1);
  } else if (event.key === "Enter") {
    handleSearch(event);
  }
}

function handleSearch(event) {
  if (event.isComposing || event.keyCode === 229) return;

  if (event.key === "Enter" || event.type === "search") {
    if (isEnableSearching()) {
      event.preventDefault();
      searching();
    }
  }
}

function handleSelectSuggestion() {
  if (isEnableSearching()) {
    searching();
  }
}
</script>

<style scoped>
.search-bar {
  font-family: "DungGeunMo";
  font-size: 1.2em;
  padding: 2px;
  border-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  margin-bottom: 10px;
  position: relative;
  z-index: 3000;

  top: 2%;
  /* left: 100px; */
  right: auto;
  width: 350px;
  max-width: none;
}

.search-bar-border {
  background-color: rgb(46, 67, 90);
  border: 1.5px solid white;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.search-input-container {
  position: relative;
  width: 100%;
}
.search-input {
  color: white;
  font-family: "DungGeunMo";
  background-color: rgb(46, 67, 90);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  font-size: 1.2em;
  border: 0;
  padding: 0.5em;
}

.close-button {
  position: absolute;
  right: 10px;
  transform: translateY(50%);
  cursor: pointer;
  width: 22px;
  height: 22px;
}

.with-autocomplete {
  border-bottom: 1.5px solid white;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.autocomplete-list {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-y: auto;
  width: 100%;
  z-index: 1002;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: auto;
}

.autocomplete-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  padding: 0.5em;
  cursor: pointer;
}

.autocomplete-list li.selected {
  background-color: rgba(0, 0, 0, 0.3);
}

.autocomplete-list li.recent .delete-history-button {
  margin-left: auto;
  color: white;
  cursor: pointer;
}

.delete-history-button {
  padding-left: 10px;
  padding-right: 10px;
}

.autocomplete-list li:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

input::placeholder {
  color: #bbb;
  opacity: 1;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .search-bar {
    left: 0px;
    right: 0px;
  }

  li {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
