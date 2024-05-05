<template>
  <div :class="{ sidebar: true, 'is-open': isOpen }">
    <button @click="toggleMenu">Toggle Menu</button>
    <h1>Menu</h1>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      isOpen: true,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: grey;
  color: black;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease;
  transform: translateX(100);
  padding: 20px;
  /* z-index: 1000; */
}

.sidebar .is-open {
  transform: translateX(0);
}

ul {
  list-style-type: none;
  padding: 0;
}

li a {
  color: white;
  text-decoration: none;
}
</style>
