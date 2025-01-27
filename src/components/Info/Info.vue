<template>
  <div class="result-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1>약품 정보</h1>
    </header>

    <main class="main-content">
      <div v-if="!isTTSSupported" class="tts-warning">
        이 브라우저는 음성 기능을 지원하지 않습니다.
      </div>

      <div
        v-if="medicineInfo?.medicine_info?.length"
        class="med-info"
        @click="navigateToInfo(med.id)"
      >
        <div class="header-wrapper">
          <div class="title-section">
            <h3 class="med-title">
              {{ medicineInfo.medicine_info[0].name }}
            </h3>
            <h5 class="med-id">식별번호 : {{ medId }}</h5>
          </div>

          <div class="tts-controls">
            <button
              @click="toggleTTS"
              :disabled="isLoading || !isTTSSupported"
              class="tts-button"
            >
              <span v-if="!isSpeaking">🔊 읽어주기</span>
              <span v-else>⏸ 일시정지</span>
            </button>
            <button
              @click="stopTTS"
              :disabled="!isSpeaking"
              class="tts-button stop"
            >
              ⏹ 정지
            </button>
          </div>
        </div>

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
import { ref, onMounted, onUnmounted } from "vue";
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
    console.log("요청 URL:", `${BASE_URL}/medicine/${medId}`);

    const response = await axios.get(`${BASE_URL}/medicine/${medId}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("API 응답:", response.data);
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

const isSpeaking = ref(false);
const isTTSSupported = ref(false);
let speechSynth = null;
let currentUtterance = null;

const initTTS = () => {
  if ("speechSynthesis" in window) {
    speechSynth = window.speechSynthesis;
    isTTSSupported.value = true;
  } else {
    console.warn("음성 합성이 지원되지 않습니다.");
    isTTSSupported.value = false;
  }
};

const generateTTSText = (info) => {
  if (!info?.medicine_info?.[0]) return "";

  const med = info.medicine_info[0];
  return `
    약품명: ${med.name}.
    분류: ${med.classification}.
    용도: ${med.type}.
    외형: ${med.appearance}.
    제품 규격: 모양은 ${med.shape},
    크기는 ${med.bigSize} 곱하기 ${med.smallSize} 밀리미터,
    두께는 ${med.thick} 밀리미터 입니다.
  `.trim();
};

const configureTTS = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.8;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    isSpeaking.value = false;
  };

  utterance.onerror = (event) => {
    console.error("TTS 오류:", event);
    isSpeaking.value = false;
  };

  return utterance;
};

const toggleTTS = () => {
  if (!isTTSSupported.value) return;

  if (isSpeaking.value) {
    speechSynth.pause();
    isSpeaking.value = false;
  } else {
    if (speechSynth.paused) {
      speechSynth.resume();
    } else {
      const text = generateTTSText(medicineInfo.value);
      currentUtterance = configureTTS(text);
      speechSynth.speak(currentUtterance);
    }
    isSpeaking.value = true;
  }
};

const stopTTS = () => {
  if (!isTTSSupported.value) return;

  speechSynth.cancel();
  isSpeaking.value = false;
};

onUnmounted(() => {
  stopTTS();
});

onMounted(() => {
  initTTS();
  fetchMedicineInfo();
});

const navigateToInfo = (id) => {
  console.log(id);
  router.push({ name: "Info", params: { id } });
};
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

    .tts-warning {
      margin-top: 10px;
      text-align: center;
      color: #f44336;
      font-size: 0.9rem;
    }

    .med-info {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 16px;

        .title-section {
          .med-title {
            font-size: 1.3rem;
            margin: 0 0 4px;
            color: #333;
            font-weight: 600;
          }

          .med-id {
            font-size: 1rem;
            color: #666;
            margin: 0;
          }
        }

        .tts-controls {
          display: flex;
          gap: 8px;
          margin-top: 4px;

          .tts-button {
            background: #26a69a;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            white-space: nowrap;

            &:hover:not(:disabled) {
              background: #2bbbad;
              transform: translateY(-1px);
            }

            &.stop {
              background: #ef5350;

              &:hover:not(:disabled) {
                background: #f44336;
              }
            }
          }
        }
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
