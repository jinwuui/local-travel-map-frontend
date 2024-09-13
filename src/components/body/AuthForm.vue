<template>
  <div class="background">
    <div class="auth-form">
      <div class="auth-header">
        <div class="form-title">
          <div class="form-title-text">
            {{ isLogin ? t("navbar.로그인") : t("navbar.회원가입") }}
          </div>
        </div>
        <img
          class="close-button"
          @click="toggleAuthForm"
          :src="close_icon"
          alt="X"
        />
      </div>

      <div class="form">
        <div class="border">
          <div class="form-input">
            <input
              ref="firstInput"
              type="text"
              :placeholder="t('auth.이메일')"
              :class="{ 'input-error': !email && isInvalidInput }"
              v-bind:value="emailText"
              @input="setEmail"
            />
            <input
              v-if="!isLogin"
              type="text"
              :placeholder="t('auth.닉네임')"
              :class="{ 'input-error': !nickname && isInvalidInput }"
              v-bind:value="nicknameText"
              @input="setNickname"
            />
            <input
              type="password"
              :placeholder="t('auth.비밀번호')"
              :class="{ 'input-error': !password && isInvalidInput }"
              v-bind:value="passwordText"
              @input="setPassword"
            />
          </div>
          <div class="form-button">
            <button @click="handleSubmit">
              {{ isLogin ? t("navbar.로그인") : t("navbar.회원가입") }}
            </button>
            <div class="toggle-auth" @click="toggleAuthMode">
              {{
                isLogin
                  ? t("auth.계정이 없으신가요? 회원가입")
                  : t("auth.이미 계정이 있으신가요? 로그인")
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useToast, POSITION } from "vue-toastification";
import { ref, onMounted, onBeforeUnmount } from "vue";
import useAuth from "@/components/body/states/useAuth";
import uiState from "@/components/states/uiState";

const toast = useToast();

const {
  emailText,
  passwordText,
  nicknameText,
  setEmail,
  setPassword,
  setNickname,
  resetForm,
  login,
  signUp,
} = useAuth();
const { toggleAuthForm } = uiState;

const close_icon = require("@/assets/pixels/close.png");
const firstInput = ref(null);
const isInvalidInput = ref(false);
const isLogin = ref(true);

function handleSubmit() {
  isInvalidInput.value = true;

  if (isLogin.value) {
    login()
      .then(() => {
        isInvalidInput.value = false;
      })
      .catch(() =>
        toast.error(t("toast.로그인 실패!"), {
          position: POSITION.TOP_CENTER,
          timeout: 2000,
        })
      );
  } else {
    signUp()
      .then(() => {
        isInvalidInput.value = false;
      })
      .catch(() =>
        toast.error(t("toast.회원가입 실패!"), {
          position: POSITION.TOP_CENTER,
          timeout: 2000,
        })
      );
  }
}

function toggleAuthMode() {
  isLogin.value = !isLogin.value;
  resetForm();
  isInvalidInput.value = false;
}

onMounted(() => {
  setTimeout(() => firstInput.value?.focus(), 0);
});

onBeforeUnmount(() => {
  firstInput.value = null;
});
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

input,
button {
  font-size: 1.5em;
}

.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  cursor: pointer;
}

.form-title {
  flex: 0.4;
  display: flex;
  justify-content: center;
  background-color: rgb(35, 54, 80);
  color: white;
  font-size: 1.3em;
  padding-top: 2px;
  padding-left: 2px;
  padding-right: 2px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.form {
  background-color: rgb(35, 54, 80);
  color: white;
  border-radius: 6px;
  padding: 2px;
}

.form-title-text {
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top: 1.5px solid white;
  border-left: 1.5px solid white;
  border-right: 1.5px solid white;
}

.border {
  padding: 13px;
  padding-bottom: 20px;
  padding-top: 20px;
  border: 1.5px solid white;
  border-radius: 4px;
  width: 22em;
  min-width: 150px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-input {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-button {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  margin-top: 30px;
}

.toggle-auth {
  font-size: 0.75em;
  position: relative;
  padding-bottom: 2px;
  border-bottom: 0.1em solid white;
  cursor: pointer;
}

.toggle-auth:hover {
  opacity: 0.8;
}

.input-error {
  border: 2px solid red;
  color: red;
}

.input-error::placeholder {
  color: red; /* 원하는 색상으로 변경 */
}
</style>
