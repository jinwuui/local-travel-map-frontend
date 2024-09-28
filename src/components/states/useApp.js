import { ref, computed } from "vue";

const user = ref(null);

function setUser(newUser) {
  user.value = newUser;
  saveUser();
}

function loadUser() {
  if (user.value == null) {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
      } catch (error) {
        console.error("로컬 저장소로부터 user 불러오기 실패", error);
        user.value = null;
      }
    }
  }
  return user.value;
}

function saveUser() {
  try {
    if (user.value) {
      localStorage.setItem("user", user.value.userId);
      localStorage.setItem("accessToken", user.value.accessToken);
      localStorage.setItem("refreshToken", user.value.refreshToken);
    }
  } catch (error) {
    console.error("로컬 저장소에 user 저장 실패", error);
  }
}

function removeUser() {
  user.value = null;
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export default function useApp() {
  return {
    user: computed(() => user.value),
    setUser,
    loadUser,
    saveUser,
    removeUser,
  };
}
