<template>
  <div class="feedback-view">
    <div class="feedback-input">
      <textarea
        class="content-input"
        v-bind:value="feedbackContent"
        @input="setFeedbackContent"
        :placeholder="t('feedback.여기에 글을 작성하세요')"
      />
      <textarea
        class="writer-input"
        v-bind:value="feedbackWriter"
        @input="setFeedbackWriter"
        :placeholder="t('feedback.익명의 모험가')"
      />
      <div id="parchment">
        <svg>
          <filter id="wavy2">
            <feTurbulence
              x="0"
              y="0"
              baseFrequency="0.02"
              numOctaves="5"
              seed="1"
            ></feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </svg>
      </div>
    </div>
    <div class="step-change">
      <button @click="navigateToPreviousComponent">
        {{ t("feedback.취소") }}
      </button>
      <button @click="handleSubmitFeedback">{{ t("feedback.보내기") }}</button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useToast, POSITION } from "vue-toastification";
import uiState from "@/components/states/uiState";
import useNavBar from "@/components/body/states/useNavBar";

const toast = useToast();

const { navigateToPreviousComponent } = uiState;
const {
  feedbackContent,
  setFeedbackContent,
  feedbackWriter,
  setFeedbackWriter,
  submitFeedback,
} = useNavBar();

async function handleSubmitFeedback() {
  await submitFeedback()
    .then(() =>
      toast.success(t("toast.피드백 감사합니다!"), {
        position: POSITION.TOP_LEFT,
        timeout: 2000,
      })
    )
    .catch(() =>
      toast.error(t("건의할 내용을 입력해주세요"), {
        position: POSITION.TOP_LEFT,
        timeout: 2000,
      })
    );
}
</script>

<style scoped>
.feedback-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 10px;
}

.image-container {
  position: relative;
  width: 600px; /* 필요에 따라 조정 */
  height: 800px; /* 필요에 따라 조정 */
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feedback-input {
  width: 100%;
  height: 100%;
}

.content-input {
  position: absolute;
  top: 50px;
  left: 50px;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  padding: 10px;
  box-sizing: border-box;
  background: transparent;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  z-index: 2222;
}

.writer-input {
  position: absolute;
  bottom: 150px;
  right: 50px;
  padding: 10px;
  box-sizing: border-box;
  background: transparent;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  text-align: right;
  z-index: 2222;
}

#parchment {
  display: flex;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  box-shadow: 2px 3px 20px black, 0 0 60px #8a4d0f inset;
  background: #fffef0;
  filter: url(#wavy2);
}

.step-change {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-top: 30px;
}

.step-change button {
  width: 6em;
  height: 2.2em;
  font-size: 1.2em;
  /* padding: 10px 20px; */
  margin: 10px;
  border-radius: 8px;
  background-color: #2f6caa;
  color: white;
  border: 1.5px solid #6fd4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap; /* 텍스트 줄 바꿈을 방지합니다. */
  overflow: hidden;
  display: inline-block;
}

.step-change button:hover {
  background-color: #1f4c7a; /* 호버 시 배경 색상 */
}
</style>
