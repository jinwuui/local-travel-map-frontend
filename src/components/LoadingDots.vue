<template>
  <div class="loading-container">
    <div class="pixel-box">
      <div class="pixel"></div>
      <div class="pixel"></div>
      <div class="pixel"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.pixel-box {
  display: flex;
  gap: 6px;
}

.pixel {
  width: 12px;
  height: 12px;
  background-color: #000;
  animation: pixelMove 1.5s infinite;
}

.pixel:nth-child(1) {
  animation-delay: 0s;
}

.pixel:nth-child(2) {
  animation-delay: 0.5s;
}

.pixel:nth-child(3) {
  animation-delay: 1s;
}

@keyframes pixelMove {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
