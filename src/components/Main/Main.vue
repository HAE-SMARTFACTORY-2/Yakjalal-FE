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
        <div
          v-for="med in currentMedications"
          :key="med.id"
          class="med-item"
          @click="navigateToInfo(med.id)"
        >
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
import { useRouter } from "vue-router";

const router = useRouter();

// API 전 임시데이터입니다 !!
const todayMedications = ref({
  아침: ["마이칼디정", "가스파플러스정", "코큐렉스연질캡슐", "선콜정"],
  저녁: ["단나에프캡슐", "하드코프캡슐", "비타콜드정"],
  점심: ["바르탄정(발사르탄)", "제이코정"],
});

const currentMedications = ref([
  {
    id: "1",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/150834126208100152",
  },
  {
    id: "2",
    name: "가두에정",
    type: "항악성종양제",
    image:
      "https://github.com/user-attachments/assets/977cbf95-ee26-4d59-80e6-2d7e93a48a1b",
  },
  {
    id: "3",
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
    padding: 20px;
    padding-top: 0;

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
