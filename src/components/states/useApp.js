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
    localStorage.setItem("user", JSON.stringify(user.value));
  } catch (error) {
    console.error("로컬 저장소에 user 저장 실패", error);
  }
}

function removeUser() {
  user.value = null;
  localStorage.removeItem("user");
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
