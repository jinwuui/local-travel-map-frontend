import { reactive, computed } from "vue";
import { useToast, POSITION } from "vue-toastification";

import { userAPI } from "@/services/user.api";

import uiState from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const toast = useToast();

const { setUser } = useApp();
const { toggleLoginForm } = uiState;

const state = reactive({
  username: null,
  password: null,
});

function setUsername(event) {
  state.username = event.target.value;
}

function setPassword(event) {
  state.password = event.target.value;
}

async function login() {
  console.log("login", state.username, state.password);
  await userAPI
    .login({ username: state.username, password: state.password })
    .then((data) => {
      setUser(data.user);
      toggleLoginForm();
    })
    .catch((error) => {
      console.error("로그인 오류:", error);
      toast.error("로그인 실패!", {
        position: POSITION.TOP_CENTER,
        timeout: 2000,
      });
    });
}

export default function useLogin() {
  return {
    usernameText: computed(() => state.username),
    passwordText: computed(() => state.password),
    setUsername,
    setPassword,
    login,
  };
}
