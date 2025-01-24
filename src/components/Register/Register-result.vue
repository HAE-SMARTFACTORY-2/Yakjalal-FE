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
      <h4 class="med-date">약 타신 날 : 25/01/12</h4>
      <!--Todo : 수정 필요 -->
      <div class="med-list">
        <div v-for="med in currentMedications" :key="med.id" class="med-item">
          <div class="med-info">
            <h3>{{ med.name }} (품목명)</h3>
            <p>분류: {{ med.type }}</p>
          </div>
          <img :src="med.image" :alt="med.name" class="med-image" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.back();

// API 전 임시데이터입니다 !!
const currentMedications = ref([
  {
    id: "mock-1",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "/Users/olynny/Desktop/현대오토에버 모빌리티 스쿨/Yakjalal-FE/src/assets/medi1.jpg",
  },
  {
    id: "mock-2",
    name: "가두에정",
    type: "항악성종양제",
    image: "yakjalal/src/assets/medi1.jpg",
  },
  {
    id: "mock-1",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "/Users/olynny/Desktop/현대오토에버 모빌리티 스쿨/Yakjalal-FE/src/assets/medi1.jpg",
  },
]);
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
      margin: 10px;
      margin-bottom: 20px;
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
          width: 60px;
          height: 30px;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
