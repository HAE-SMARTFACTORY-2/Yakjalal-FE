<template>
  <div class="medication-page">
    <header class="header">
      <div class="user-info">
        <h1>최영린 님</h1>
        <p>오늘도 약 잘 챙겨드세요 💊</p>
      </div>
    </header>

    <section class="time-sections">
      <div class="time-container">
        <div
          v-for="(meds, period) in todayMedications"
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
        <div v-for="med in currentMedications" :key="med.id" class="med-item">
          <div class="med-info">
            <h3>{{ med.name }} (품목명)</h3>
            <p>분류: {{ med.type }}</p>
          </div>
          <img :src="med.image" :alt="med.name" class="med-image" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// API 전 임시데이터입니다 !!
const todayMedications = ref({
  아침: ["마이칼디정", "가스파플러스정", "코큐렉스연질캡슐", "선콜정"],
  저녁: ["단나에프캡슐", "하드코프캡슐", "비타콜드정"],
  점심: ["바르탄정(발사르탄)", "제이코정"],
});

const currentMedications = ref([
  {
    id: "mock-1",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "https://github.com/user-attachments/assets/977cbf95-ee26-4d59-80e6-2d7e93a48a1b",
  },
  {
    id: "mock-2",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "https://github.com/user-attachments/assets/977cbf95-ee26-4d59-80e6-2d7e93a48a1b",
  },
  {
    id: "mock-1",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "https://github.com/user-attachments/assets/977cbf95-ee26-4d59-80e6-2d7e93a48a1b",
  },
]);

function getPeriodEmoji(period) {
  const emojis = {
    아침: "☀️",
    점심: "🌓",
    저녁: "🌕",
  };
  return emojis[period] || "";
}
</script>

<style scoped lang="scss">
.medication-page {
  padding: 20px;
  background: #fff;
  min-height: 100vh;

  .header {
    .user-info {
      position: relative;

      h1 {
        font-size: 1.5rem;
        margin: 0;
      }

      p {
        color: #666;
        margin: 5px 0;
      }

      .notification-btn {
        position: absolute;
        right: 0;
        top: 0;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
      }
    }
  }

  .time-sections {
    margin: 30px 0;

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
            border-radius: 20px;
            background: #fff;
            font-size: 0.9rem;
            cursor: pointer;

            &:active {
              background: #e8f5e9;
            }
          }
        }
      }
    }
  }

  .current-medications {
    .med-list {
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
