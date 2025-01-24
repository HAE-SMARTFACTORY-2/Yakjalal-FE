<template>
  <div class="result-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1>약 정보 조회</h1>
    </header>

    <main class="main-content">
      <h5 class="guide-text">약 이름!!{{ medId }}</h5>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const goBack = () => router.back();

const medId = route.params.id;
console.log(medId);
</script>

<style lang="scss" scoped>
.result-page {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;

  .header {
    background: #26a69a;
    color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;

    .back-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      padding: 5px;
      cursor: pointer;
    }

    h1 {
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .main-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .guide-text {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      color: #333;
    }
  }
}
</style>
