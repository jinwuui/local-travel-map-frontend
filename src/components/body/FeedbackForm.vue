<template>
  <div class="feedback-view">
    <div class="feedback-input">
      <textarea
        class="content-input"
        v-bind:value="feedbackContent"
        @input="handleInputContent"
        :placeholder="t('feedback.여기에 글을 작성하세요')"
        maxlength="300"
      />
      <textarea
        class="writer-input"
        v-bind:value="feedbackWriter"
        @input="handleInputWriter"
        :placeholder="t('feedback.익명의 모험가')"
        maxlength="20"
      />
      <img class="input-background-img" :src="oldPaperImg" />
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

const oldPaperImg = require("@/assets/pixelarts/old_paper.webp");

const maxLinesContent = 14;
const maxLinesWriter = 1;

function handleInputContent(event) {
  const lines = event.target.value.split("\n");
  if (lines.length > maxLinesContent) {
    event.target.value = lines.slice(0, maxLinesContent).join("\n");
  }
  setFeedbackContent(event.target.value);
}

function handleInputWriter(event) {
  const lines = event.target.value.split("\n");
  if (lines.length > maxLinesWriter) {
    event.target.value = lines.slice(0, maxLinesWriter).join("\n");
  }
  setFeedbackWriter(event.target.value);
}

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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 15px;
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

.input-background-img {
  width: 100%;
  height: 100%;
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
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
}

.step-change button:hover {
  background-color: #1f4c7a;
}

/* 모바일 화면 */
@media (max-width: 768px) {
  .feedback-view {
    height: 500px;
  }

  .feedback-input {
    height: 425px;
  }

  .content-input {
    height: 250px;
  }

  .step-change {
    margin: 0px;
  }
}
</style>
