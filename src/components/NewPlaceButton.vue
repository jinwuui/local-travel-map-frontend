<template>
  <div class="registration-place-btn" @click="handleClick">
    <p>등록하기</p>
  </div>
</template>

<script setup>
function handleClick() {
  //TODO: new place form open
}
</script>

<style scoped>
.registration-place-btn {
  position: absolute;
  bottom: 3%;
  left: 50%;
  display: inline-block;
  padding: 0.1em 0.5em;
  background-color: #4caf50;
  border: 2.3px solid #388e3c;
  border-radius: 7px;
  box-shadow: 0 4px #2e7d32;
  color: #fff;
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0 #2e7d32;
  cursor: pointer;
  user-select: none;
  transition: transform 0.1s;
}

.registration-place-btn:hover {
  background-color: #43a047;
}

.registration-place-btn:active {
  transform: translateY(3px);
  box-shadow: 0 2px #2e7d32;
}

.registration-place-btn > p {
  margin: 7px;
}
</style>
