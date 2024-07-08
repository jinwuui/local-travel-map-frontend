import { reactive, computed } from "vue";

import { userAPI } from "@/services/user.api";

import uiState from "@/components/states/uiState";
import useApp from "@/components/states/useApp";

const { setUser } = useApp();
const { toggleLoginForm, executeLoginNextAction } = uiState;

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
  await userAPI
    .login({ username: state.username, password: state.password })
    .then((data) => {
      setUser(data.user);
      toggleLoginForm();
      executeLoginNextAction();
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
