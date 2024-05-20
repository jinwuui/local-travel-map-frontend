<template>
  <div class="search-bar">
    <input ref="myInput" type="text" placeholder="검색어를 입력하세요..." />
  </div>
</template>

<script setup></script>

<style scoped>
.search-bar {
  padding: 2px;
  border-radius: 6px;
  background-color: rgb(35, 54, 80);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  margin-bottom: 10px;
}

input {
  font-family: "DungGeunMo";
  background-color: rgb(46, 67, 90);
  border: 1.85px solid white;
  border-radius: 4px;
}

.search-bar {
  position: fixed;
  top: 10px; /* 모바일 환경에서 화면 최상단 */
  left: 10px;
  right: 10px;
  width: 300px;
  max-width: 100%;
  width: auto;
  z-index: 1001; /* SideTab 위에 오도록 설정 */
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1.2em;
}

/* 데스크탑 스타일 */
@media (min-width: 769px) {
  .search-bar {
    position: fixed;
    top: 2%;
    left: 100px;
    right: auto;
    width: 300px;
    max-width: none;
    z-index: 1001;
  }
}

input::placeholder {
  color: #bbb; /* 밝은 회색으로 설정 */
  opacity: 1; /* 필요 시 투명도 조정 */
}
</style>
