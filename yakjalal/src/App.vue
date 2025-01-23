<!-- <template>
  <div>
    <h1 class="title">약잘알</h1>
    <Navbar>
    </Navbar>
  </div>
</template>

<script setup>
import Navbar from "./components/About/AboutComponent.vue";
</script>


<style lang="scss" scoped>
.title {
  color: #333;
}
</style> -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
