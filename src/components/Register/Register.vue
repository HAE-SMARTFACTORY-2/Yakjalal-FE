<template>
  <div class="upload-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <span>←</span>
      </button>
      <h1>복용약 등록</h1>
    </header>

    <main class="main-content">
      <p class="guide-text">약 봉투 이미지를 등록해주세요</p>

      <div
        class="image-upload-area"
        @click="triggerFileInput"
        :class="{ 'has-error': uploadError }"
      >
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="image/*"
          capture="environment"
          class="hidden-input"
        />

        <template v-if="previewImage">
          <img
            :src="previewImage"
            class="preview-image"
            alt="업로드된 이미지"
          />
        </template>
        <div v-else class="upload-placeholder">
          <span>이미지를 선택하세요</span>
        </div>
      </div>

      <p v-if="uploadError" class="error-message">{{ uploadError }}</p>

      <!-- 인식 버튼 -->
      <button
        class="recognize-btn"
        @click="handleRecognize"
        :disabled="!previewImage || isProcessing"
      >
        {{ isProcessing ? "처리중..." : "인식" }}
      </button>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const fileInput = ref(null);
const previewImage = ref(null);
const uploadError = ref(null);
const isProcessing = ref(false);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const triggerFileInput = () => {
  uploadError.value = null;
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    uploadError.value = "이미지 파일만 업로드 가능합니다.";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    uploadError.value = "파일 크기는 5MB 이하여야 합니다.";
    return;
  }

  try {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
      uploadError.value = null;
    };
    reader.onerror = () => {
      uploadError.value = "이미지 로드 중 오류가 발생했습니다.";
    };
    reader.readAsDataURL(file);
  } catch (error) {
    uploadError.value = "이미지 처리 중 오류가 발생했습니다.";
    console.error("Image upload error:", error);
  }
};

const handleRecognize = async () => {
  if (!previewImage.value) return;

  try {
    isProcessing.value = true;
    // 여기에 실제 이미지 인식 API 호출 로직 추가
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/ocr-result"); // OCR 결과 페이지로 이동 (약 봉투 등록 시)
  } catch (error) {
    uploadError.value = "이미지 인식 중 오류가 발생했습니다.";
    console.error("Recognition error:", error);
  } finally {
    isProcessing.value = false;
  }
};

const goBack = () => router.back();
</script>

<style lang="scss" scoped>
.upload-page {
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
    gap: 20px;

    .guide-text {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      color: #333;
    }

    .image-upload-area {
      aspect-ratio: 16/9;
      background: #f5f5f5;
      border-radius: 8px;
      border: 2px dashed #26a69a;
      cursor: pointer;
      overflow: hidden;
      position: relative;

      &.has-error {
        border-color: #f44336;
      }

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .upload-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
      }
    }

    .error-message {
      color: #f44336;
      font-size: 0.9rem;
      text-align: center;
      margin: 0;
    }

    .recognize-btn {
      margin-top: auto;
      margin-bottom: 60px;
      padding: 15px;
      border-radius: 8px;
      border: none;
      background: #26a69a;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      &:active {
        background: #1e8e82;
      }
    }
  }
}

.hidden-input {
  display: none;
}
</style>
