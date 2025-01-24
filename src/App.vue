<template>
  <div id="app">
    <router-view />
    <NavBar v-if="!hideNavBar" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/Common/NavBar.vue";

const route = useRoute();
const hideNavBar = computed(() => route.meta.hideNavBar);
</script>

<style>
body,
html,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}
</style>
