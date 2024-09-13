import { reactive, computed } from "vue";

import { userAPI } from "@/services/user.api";

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
  await userAPI
    .login({ email: state.email, password: state.password })
    .then((data) => {
      setUser(data.user);
      toggleAuthForm();
      executeLoginNextAction();
    });
}

async function signUp() {}

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
