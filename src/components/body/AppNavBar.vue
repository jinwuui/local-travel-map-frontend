<template>
  <nav class="nav">
    <div class="nav-border">
      <p class="logo" @click="reloadPage">로-컬<br />xyz</p>
      <ul>
        <li @click="navigateToComponent(COMPONENT_NAMES.FAVORITE_VIEW)">
          저장
        </li>
        <li @click="navigateToComponent(COMPONENT_NAMES.ANNOUNCEMENT_VIEW)">
          공지
        </li>
        <li @click="navigateToComponent(COMPONENT_NAMES.FEEDBACK_FORM)">
          건의
        </li>
        <li>⚙️</li>
      </ul>
    </div>
  </nav>
  <div class="window">
    <div class=""></div>
    <div></div>
  </div>
</template>

<script setup>
// import useNavBar from "@/components/states/useNavBar";
import uiState, { COMPONENT_NAMES } from "@/components/states/uiState";

const { navigateToComponent } = uiState;

const reloadPage = () => {
  window.location.reload();
};
</script>

<style>
.nav {
  background-color: rgb(35, 54, 80);
  padding-right: 2px;
  color: white;
  z-index: 9999;
  font-family: "DungGeunMo";
}

.nav-border {
  border-right: 1.85px solid white;
  display: flex;
  height: 100%;
  width: 100%;
}

.logo {
  display: none;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.nav li {
  padding: 15px;
  text-align: center;
  flex-grow: 1;
  cursor: pointer;
}

/* Default is for mobile with bottom navigation */
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content {
  margin-left: 0;
  margin-bottom: 50px; /* Adjust this value to match the height of the bottom nav */
  padding: 20px;
}

@media (min-width: 769px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 100%;
    /* display: block; */
  }

  .nav-border {
    flex-direction: column;
    align-items: center;
  }

  .logo {
    display: block;
    font-family: "DNFBitBitv2";
    font-size: 1.4em;
    margin-top: 30px;
    margin-bottom: 0px;
    text-align: right;
    line-height: 1;
    text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000,
      3px 3px 0 #000, -3px 0 0 #000, 3px 0 0 #000, 0 -3px 0 #000, 0 3px 0 #000;
    cursor: pointer;
  }

  .nav ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav li {
    margin: 10px;
    margin-top: 30px;
    border-radius: 6px;
    border: 1.85px solid white;
    background-color: rgb(22, 30, 37);
    padding: 15px;
    /* padding-top: 60px; */
    text-align: center;
    flex-grow: 0;
    font-size: 1.2em;
  }

  .content {
    margin-left: 200px; /* Adjust this value to match the width of the side nav */
    margin-bottom: 0;
  }
}
</style>
