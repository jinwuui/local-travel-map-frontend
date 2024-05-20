<template>
  <div>
    <nav class="nav">
      <ul>
        <li>저장</li>
        <li>최근</li>
        <li>설정</li>
        <li>공지</li>
        <li>건의</li>
      </ul>
    </nav>
  </div>
</template>

<style>
.nav {
  background-color: rgb(35, 54, 80);
  color: white;
  z-index: 9999;
  font-family: "DungGeunMo";
}

.nav ul {
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

/* Media query for desktop/tablet with sidebar navigation */
@media (min-width: 769px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    height: 100%;
    display: block;
  }

  .nav ul {
    display: block;
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
