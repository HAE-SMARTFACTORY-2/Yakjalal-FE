<template>
  <div class="result-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1>복용약 검색</h1>
    </header>

    <main class="main-content">
      <h5 class="guide-text">인식 결과</h5>
      <div class="med-list">
        <div class="med-item">
          <div class="med-info">
            <h3>{{ reg_results.약품이름 }}</h3>
            <p>{{ reg_results.종류 }}</p>
          </div>
          <img
            :src="reg_results.이미지"
            :alt="reg_results.약품이름"
            class="med-image"
          />
        </div>
      </div>
      <div class="button-area">
        <button class="btn" @click="goBack">재촬영</button>
        <button class="btn" @click="handleRegister">등록</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.back();

const medicineData = ref(history.state.medicineData);
const reg_results = ref(history.state.medicineData.reg_results);
console.log("데이터 확인:", reg_results.value);

const handleRegister = async () => {
  // Todo : API 연동
  // Todo : Post 요청 API
  router.push("/main");
};
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

    .med-list {
      margin: 10px;

      .med-item {
        background: #26a6997d;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .med-info {
          h3 {
            margin: 0;
            font-size: 1rem;
          }

          p {
            margin: 5px 0 0;
            color: #666;
            font-size: 0.9rem;
          }
        }

        .med-image {
          width: 100px;
          height: 50px;
          object-fit: contain;
        }
      }
    }

    .button-area {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 60px;

      .btn {
        flex: 1;
        padding: 15px;
        border-radius: 8px;
        border: none;
        background: #26a69a;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:active {
          background: #26a69a;
        }
      }
    }
  }
}
</style>
