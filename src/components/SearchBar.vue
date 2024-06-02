<template>
  <div ref="searchBar" class="search-bar">
    <div class="search-bar-border">
      <input
        :class="[
          'search-input',
          suggestions.length > 0 ? 'with-autocomplete' : '',
        ]"
        v-bind:value="inputText"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="autocomplete(inputText)"
        type="text"
        placeholder="검색어를 입력하세요..."
      />
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
          @mousedown.self="handleSelectSuggestion(index)"
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import useSearch from "@/components/states/useSearch";

const {
  loadSearchHistory,
  deleteSearchHistory,

  inputText,
  setInputText,
  autocomplete,

  suggestions,
  clearSuggestions,
  selectSuggestion,

  selectedIndex,
  setSelectedIndex,
  isEnableEnter,
} = useSearch();

const searchBar = ref(null);

onMounted(() => {
  loadSearchHistory();
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function handleClickOutside(event) {
  if (searchBar.value && !searchBar.value.contains(event.target)) {
    // 클릭이 searchBar 외부에서 발생한 경우
    setTimeout(() => {
      clearSuggestions();
    }, 100);
  }
}

function handleInput(event) {
  setInputText(event.target.value);
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
    if (isEnableEnter()) {
      event.preventDefault();
      selectSuggestion(selectedIndex.value);
    }
  }
}

function handleSelectSuggestion(index) {
  setTimeout(() => {
    clearSuggestions();
  }, 100);
  selectSuggestion(index);
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
  position: fixed;
  top: 10px; /* 모바일 환경에서 화면 최상단 */
  left: 10px;
  right: 10px;
  width: 300px;
  max-width: 100%;
  z-index: 3000; /* SideTab 위에 오도록 설정 */
}

.search-bar-border {
  background-color: rgb(46, 67, 90);
  border: 1.85px solid white;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.search-input {
  color: white;
  font-family: "DungGeunMo";
  background-color: rgb(46, 67, 90);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  text-decoration: none; /* 텍스트 밑줄 제거 */
  font-size: 1.2em;
  border: 0;
  padding: 0.5em;
}

.with-autocomplete {
  border-bottom: 1.85px solid white;
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

@media (min-width: 769px) {
  .search-bar {
    top: 2%;
    left: 100px;
    right: auto;
    width: 350px;
    max-width: none;
  }
}

input::placeholder {
  color: #bbb; /* 밝은 회색으로 설정 */
  opacity: 1; /* 필요 시 투명도 조정 */
}
</style>
