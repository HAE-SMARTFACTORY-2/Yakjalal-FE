<template>
  <nav class="navbar">
    <router-link to="/search" class="nav-link">
      <i class="bi bi-search"></i>
    </router-link>
    <router-link to="/main" class="nav-link">
      <i class="bi bi-house-door"></i>
    </router-link>
    <router-link to="/register" class="nav-link">
      <i class="bi bi-camera"></i>
    </router-link>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f8f8;
  box-shadow: 0 -1px 5px rgb(0 0 0 / 10%);
  z-index: 1000;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));

  .nav-link {
    text-decoration: none;
    display: flex;
    align-items: center;

    i {
      font-size: 28px;
      color: #808080;
      cursor: pointer;
      transition: color 0.3s ease;
      display: block;
    }

    &:hover i {
      color: #26a69a;
    }

    &.router-link-active i {
      color: #26a69a;
    }
  }
}

:global(body) {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
}

:global(#app) {
  padding-bottom: calc(60px + env(safe-area-inset-bottom));
}
</style>
