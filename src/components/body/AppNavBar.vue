<template>
  <nav class="nav">
    <div class="nav-border">
      <p class="logo" @click="reloadPage">{{ t("app.로-컬") }}<br />xyz</p>
      <ul>
        <li
          :class="{
            active: activeSideTab === COMPONENT_NAMES.BOOKMARK_VIEW,
          }"
          @click="handleBookmark"
        >
          {{ t("navbar.저장") }}
        </li>
        <li
          :class="{
            active: activeSideTab === COMPONENT_NAMES.ANNOUNCEMENT_VIEW,
          }"
          @click="navigateToComponent(COMPONENT_NAMES.ANNOUNCEMENT_VIEW)"
        >
          {{ t("navbar.공지") }}
        </li>
        <li
          :class="{
            active: activeSideTab === COMPONENT_NAMES.FEEDBACK_FORM,
          }"
          @click="navigateToComponent(COMPONENT_NAMES.FEEDBACK_FORM)"
        >
          {{ t("navbar.건의") }}
        </li>
        <li @click="handleLogin">
          {{ loadUser() ? t("navbar.로그아웃") : t("navbar.로그인") }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const { navigateToComponent, toggleAuthForm, activeSideTab } = uiState;
const { loadUser, removeUser } = useApp();

const reloadPage = () => {
  window.location.reload();
};

function handleBookmark() {
  if (loadUser()) {
    navigateToComponent(COMPONENT_NAMES.BOOKMARK_VIEW);
  } else {
    toggleAuthForm(() => navigateToComponent(COMPONENT_NAMES.BOOKMARK_VIEW));
  }
}

function handleLogin() {
  if (loadUser()) {
    removeUser();
    reloadPage();
  } else {
    toggleAuthForm(() => reloadPage());
  }
}
</script>

<style>
.nav {
  background-color: rgb(35, 54, 80);
  padding-right: 3.5px;
  color: white;
  z-index: 9000;
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
}

.nav-border {
  border-right: 1.5px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.logo {
  display: block;
  font-family: "subset-DNFBitBitv2";
  font-size: 1.4em;
  margin-top: 30px;
  margin-bottom: 0px;
  text-align: right;
  line-height: 1;
  text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000,
    3px 3px 0 #000, -3px 0 0 #000, 3px 0 0 #000, 0 -3px 0 #000, 0 3px 0 #000;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.nav li {
  margin: 10px;
  margin-top: 25px;
  border-radius: 6px;
  border: 1.5px solid white;
  background-color: rgb(22, 30, 37);
  padding: 15px;
  text-align: center;
  flex-grow: 0;
  font-size: 1.2em;
  cursor: pointer;
}

.nav li.active {
  color: grey;
}

.content {
  margin-left: 200px;
  margin-bottom: 0;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 2px;
  }

  .nav-border {
    border-right: none;
    flex-direction: row;
    border-top: 1.5px solid white;
    box-sizing: border-box;
  }

  .logo {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }

  .nav li {
    padding: 0;
    text-align: center;
    flex-grow: 1;
    font-size: 5vw;
    margin: 0;
    border: none;
    background-color: transparent;
  }

  .content {
    margin-left: 0;
    margin-bottom: 50px;
    padding: 20px;
  }
}
</style>
