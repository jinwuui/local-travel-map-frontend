import { reactive, computed } from "vue";

import { authAPI } from "@/services/auth.api";

import uiState from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const { setUser } = useApp();
const { toggleAuthForm, executeLoginNextAction } = uiState;

const state = reactive({
  email: null,
  password: null,
  nickname: null,
});

function setEmail(event) {
  state.email = event.target.value;
}

function setPassword(event) {
  state.password = event.target.value;
}

function setNickname(event) {
  state.nickname = event.target.value;
}

function resetForm() {
  state.email = null;
  state.password = null;
  state.nickname = null;
}

async function login() {
  if (!state.email || !state.password) {
    throw new Error("이메일 비밀번호를 입력해주세요.");
  }

  await authAPI
    .login({ email: state.email, password: state.password })
    .then((data) => {
      setUser(data);
      toggleAuthForm();
      executeLoginNextAction();
    });
}

async function signUp() {
  if (!state.email || !state.nickname || !state.password) {
    throw new Error("모든 정보를 입력해주세요.");
  }

  await authAPI.signUp({ ...state });
}

export default function useAuth() {
  return {
    emailText: computed(() => state.email),
    passwordText: computed(() => state.password),
    nicknameText: computed(() => state.nickname),
    setEmail,
    setPassword,
    setNickname,
    resetForm,
    login,
    signUp,
  };
}
