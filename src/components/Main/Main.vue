<template>
  <div class="medication-page">
    <header class="header">
      <img src="/yakjalal_icon.png" alt="약잘알" class="logo" />
      <h1>약잘알</h1>
    </header>

    <section class="time-sections">
      <div class="user-profile">
        <img src="/person-icon.png" alt="프로필" class="profile-icon" />
        <div class="user-info">
          <h1>최영린 님</h1>
          <p>오늘도 약 잘 챙겨드세요 💊</p>
        </div>
      </div>
      <div class="time-container">
        <div
          v-for="(meds, period) in todayMedications[0]"
          :key="period"
          class="period-column"
        >
          <h2 class="period-title">
            {{ period }} {{ getPeriodEmoji(period) }}
          </h2>
          <div class="med-buttons">
            <button
              v-for="(med, idx) in meds"
              :key="`${period}-${idx}`"
              class="med-button"
              :class="{ selected: isSelected(period, idx) }"
              @click="toggleSelection(period, idx)"
            >
              {{ med }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="current-medications">
      <h2>복용중인 약</h2>
      <div class="med-list">
        <div
          v-for="med in currentMedications"
          :key="med.id"
          class="med-item"
          @click="navigateToInfo(med.id)"
        >
          <div class="med-info">
            <h3>{{ med.name }}</h3>
            <p>분류: {{ med.type }}</p>
          </div>
          <img :src="med.image" :alt="med.name" class="med-image" />
        </div>
      </div>
      <button
        v-if="currentMedications.length > 0"
        @click="confirmDelete"
        class="delete-all-btn"
      >
        전체 삭제
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const todayMedications = ref({});
const currentMedications = ref({});
const isLoading = ref(false);

// 오늘의 복용약 스케줄 API
const fetchTodayMedications = async () => {
  isLoading.value = true;

  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(`${BASE_URL}/today`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    todayMedications.value = response.data.today;
  } catch (error) {
    console.error("API 요청 오류:", error);
    if (import.meta.env.DEV) {
      todayMedications.value = {
        아침: ["마이칼디정", "가스파플러스정"],
        점심: ["바르탄정", "제이코정"],
        저녁: ["단나에프캡슐", "하드코프캡슐"],
      };
    } else {
      todayMedications.value = {};
    }
  } finally {
    isLoading.value = false;
  }
};

const fetchMyMedications = async () => {
  isLoading.value = true;

  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(`${BASE_URL}/medicine`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (response.data?.current_medications) {
      currentMedications.value = response.data.current_medications;
    } else {
      currentMedications.value = [];
    }
  } catch (error) {
    console.error("API 요청 오류:", error);
    if (import.meta.env.DEV) {
      currentMedications.value = [
        {
          id: 200809361,
          name: "바르탄정(발사르탄)",
          type: "혈압강하제",
          image:
            "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147426403087300155",
        },
      ];
    } else {
      currentMedications.value = [];
    }
  } finally {
    isLoading.value = false;
  }
};

const confirmDelete = async () => {
  const isConfirmed = confirm("정말로 모든 약을 삭제하시겠습니까?");

  if (!isConfirmed) return;

  isLoading.value = true;

  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    await axios.post(`${BASE_URL}/clear`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    currentMedications.value = [];

    await Promise.all([fetchTodayMedications(), fetchMyMedications()]);

    alert("모든 약이 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("삭제 중 오류 발생:", error);
    alert("약 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTodayMedications();
  fetchMyMedications();
});

function getPeriodEmoji(period) {
  const emojis = {
    아침: "☀️",
    점심: "🌓",
    저녁: "🌕",
  };
  return emojis[period] || "";
}

const selectedMeds = ref({});
const isSelected = (period, idx) => {
  const key = `${period}-${idx}`;
  return !!selectedMeds.value[key];
};

const toggleSelection = (period, idx) => {
  const key = `${period}-${idx}`;
  selectedMeds.value[key] = !selectedMeds.value[key];
};

const navigateToInfo = (id) => {
  console.log(id);
  router.push({ name: "Info", params: { id } });
};
</script>

<style scoped lang="scss">
.medication-page {
  background: #fff;
  min-height: 100vh;
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

    h1 {
      font-size: 1.2rem;
      margin: 0;
    }

    .logo {
      width: 40px;
      height: 40px;
    }
  }

  .time-sections {
    padding: 20px;
    padding-top: 0;
    margin: 30px 0;

    .user-profile {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      padding: 0 4px;

      .profile-icon {
        width: 72px;
        height: 72px;
        flex-shrink: 0;
        object-fit: cover;
      }

      .user-info {
        flex: 1;

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: #333;
        }

        p {
          color: #666;
          margin: 4px 0 0;
          font-size: 0.95rem;
        }
      }
    }

    .time-container {
      display: flex;
      gap: 15px;

      .period-column {
        flex: 1;

        .period-title {
          text-align: center;
          font-size: 1rem;
          margin-bottom: 10px;
        }

        .med-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .med-button {
            padding: 8px;
            border: 1px solid #26a69a;
            border-radius: 15px;
            background: #fff;
            font-size: 0.9rem;
            cursor: pointer;

            &.selected {
              background: #e8f5e9;
              color: black;
            }
          }
        }
      }
    }
  }

  .current-medications {
    padding: 20px;
    padding-top: 0;

    .delete-all-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.6rem;
      transition: background-color 0.2s ease;
    }

    .med-list {
      padding-top: 10px;

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
  }
}
</style>
