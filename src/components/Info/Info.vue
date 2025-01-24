<template>
  <div class="result-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1>약품 정보</h1>
    </header>

    <main class="main-content">
      <div v-if="medicineInfo?.medicine_info?.length" class="med-info">
        <h3 class="med-title">
          {{ medicineInfo.medicine_info[0].name }}
        </h3>
        <h5 class="med-id">식별번호 : {{ medId }}</h5>

        <div class="image-section">
          <img
            :src="medicineInfo.medicine_info[0].image"
            :alt="medicineInfo.medicine_info[0].name"
            class="med-image"
          />
        </div>

        <div class="info-card">
          <h4>기본 정보</h4>
          <div class="info-list">
            <div class="info-item">
              <span>분류</span>
              <span>{{ medicineInfo.medicine_info[0].classification }}</span>
            </div>
            <div class="info-item">
              <span>용도</span>
              <span>{{ medicineInfo.medicine_info[0].type }}</span>
            </div>
            <div class="info-item">
              <span>외형</span>
              <span>{{ medicineInfo.medicine_info[0].appearance }}</span>
            </div>
          </div>
        </div>

        <div class="spec-card">
          <h4>제품 규격</h4>
          <div class="info-list">
            <div class="info-item">
              <span>모양</span>
              <span>{{ medicineInfo.medicine_info[0].shape }}</span>
            </div>
            <div class="info-item">
              <span>크기</span>
              <span
                >{{ medicineInfo.medicine_info[0].bigSize }} x
                {{ medicineInfo.medicine_info[0].smallSize }} mm</span
              >
            </div>
            <div class="info-item">
              <span>두께</span>
              <span>{{ medicineInfo.medicine_info[0].thick }} mm</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const goBack = () => router.back();

const medId = route.params.id;

const medicineInfo = ref({});
const isLoading = ref(false);

// 약 상세 조회  API
const fetchMedicineInfo = async () => {
  isLoading.value = true;

  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    console.log("요청 URL:", `${BASE_URL}/medicine/${medId}`); // 디버깅용

    const response = await axios.get(`${BASE_URL}/medicine/${medId}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("API 응답:", response.data); // 디버깅용
    medicineInfo.value = response.data;
  } catch (error) {
    console.error("API 요청 오류:", error);

    if (import.meta.env.DEV) {
      medicineInfo.value = {
        medicine_info: [
          {
            appearance: "엷은 적색의 원형 필름코팅정",
            bigSize: 6.5,
            classification: "전문의약품",
            image:
              "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300155",
            name: "바르탄정(발사르탄)",
            shape: "원형",
            smallSize: 6.5,
            thick: 1.8,
            type: "혈압강하제",
          },
        ],
      };
    } else {
      medicineInfo.value = {};
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchMedicineInfo();
});
</script>

<style lang="scss" scoped>
.result-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;

  .header {
    background: #26a69a;
    color: white;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    position: sticky;
    top: 0;
    z-index: 10;

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
    width: 100%;
    box-sizing: border-box;

    .med-info {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .med-title {
        font-size: 1.3rem;
        margin: 0;
        color: #333;
      }

      .med-id {
        font-size: 1rem;
        color: #666;
      }

      .image-section {
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
        text-align: center;

        .med-image {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      }

      .info-card,
      .spec-card {
        padding: 20px;
        border-radius: 12px;

        h4 {
          margin: 0 0 15px;
          font-weight: 600;
        }

        .info-list {
          .info-item {
            display: flex;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgb(0 0 0 / 5%);

            &:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }

            span:first-child {
              width: 80px;
              color: #666;
              font-weight: 500;
            }

            span:last-child {
              flex: 1;
              color: #333;
            }
          }
        }
      }

      .info-card {
        background: #e0f2f1;

        h4 {
          color: #26a69a;
        }
      }

      .spec-card {
        background: #e8eaf6;

        h4 {
          color: #3f51b5;
        }
      }
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  }
}
</style>
