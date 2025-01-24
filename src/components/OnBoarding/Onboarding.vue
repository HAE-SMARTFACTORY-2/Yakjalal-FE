<template>
  <div class="onboarding">
    <div class="content">
      <img
        src="/Users/olynny/Desktop/현대오토에버 모빌리티 스쿨/Yakjalal-FE/src/assets/yakjalal_icon.png"
        alt="약잘알"
        class="logo"
      />
      <h1>약잘알</h1>
    </div>

    <button class="start-button" @click="goToLogin">서비스 시작하기</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goToLogin = () => router.push("/login");
</script>

<style scoped lang="scss">
.onboarding {
  min-height: 100vh;
  background: white;
  padding: 0 20px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 200px);

    .logo {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
    }
  }

  .start-button {
    width: 100%;
    padding: 16px;
    background: #26a69a;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    cursor: pointer;

    &:active {
      background: #1e8e82;
    }
  }
}
</style>
