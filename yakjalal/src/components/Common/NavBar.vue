<template>
  <nav class="navbar">
    <router-link to="/search">
      <i class="icon">⬅️</i>
    </router-link>
    <router-link to="/main">
      <i class="icon">🏠</i>
    </router-link>
    <router-link to="/register">
      <i class="icon">🛒</i>
    </router-link>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f8f8;
  .icon {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
