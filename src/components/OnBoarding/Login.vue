<template>
  <div class="onboarding">
    <div class="content">
      <img src="/yakjalal_icon.png" alt="약잘알" class="logo" />
      <h1>약잘알</h1>

      <div class="login-form">
        <h2>로그인</h2>
        <input
          type="email"
          v-model="email"
          placeholder="email"
          class="input-field"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="input-field"
        />
        <button class="login-button" @click="handleLogin">로그인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = () => {
  router.push("/main");
};
</script>

<style scoped lang="scss">
.onboarding {
  min-height: 100vh;
  background: #f5fffd;
  padding: 0 20px;

  .content {
    padding-top: 60px;
    text-align: center;

    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 12px;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 40px;
    }
  }

  .login-form {
    padding: 0 20px;

    h2 {
      text-align: left;
      font-size: 18px;
      margin-bottom: 24px;
    }

    .input-field {
      width: 100%;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 16px;

      &:focus {
        outline: none;
        border-color: #26a69a;
      }
    }

    .login-button {
      width: 100%;
      padding: 16px;
      background: #26a69a;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      margin-top: 8px;
      cursor: pointer;

      &:active {
        background: #1e8e82;
      }
    }
  }
}
</style>
