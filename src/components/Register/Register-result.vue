<template>
  <div class="result-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1>복용약 등록</h1>
    </header>

    <main class="main-content">
      <h5 class="guide-text">인식 결과</h5>
      <h4 class="med-date">약 타신 날 : {{ reg_results.처방일자 }}</h4>
      <div class="med-list">
        <div
          v-for="med in reg_results.처방약품"
          :key="med.id"
          class="med-item"
          @click="navigateToInfo(med[5])"
        >
          <div class="med-info">
            <h3>{{ med[0] }}</h3>
            <p>분류: {{ med[2] }}</p>
            <p>투여횟수: {{ reg_results.복용정보 }}</p>
          </div>
          <img :src="med[4]" :alt="med[0]" class="med-image" />
        </div>
      </div>
      <p class="guide-message">인식 결과가 일치하다면 등록해주세요</p>
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
import axios from "axios";

const router = useRouter();
const goBack = () => router.back();

const reg_results = ref(history.state.medicineData.reg_results);
console.log("데이터 확인:", reg_results.value);

const handleRegister = async () => {
  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(
      `${BASE_URL}/medicine/save`,
      reg_results.value,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("복용약 등록 성공:", response.data);
      alert("복용약이 등록되었습니다.");
      router.push("/main");
    } else {
      throw new Error("서버 응답 오류");
    }
  } catch (error) {
    console.error("복용약 등록 오류:", error);
  }
};

const navigateToInfo = (id) => {
  console.log(id);
  router.push({ name: "Info", params: { id } });
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

    .med-date {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      color: #333;
      margin: 10px;
      margin-bottom: 10px;
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

    .guide-message {
      text-align: center;
      color: #666;
      font-size: 16px;
      margin-bottom: 20px;
      padding: 0 20px;
      line-height: 1.4;
      font-weight: 500;
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
