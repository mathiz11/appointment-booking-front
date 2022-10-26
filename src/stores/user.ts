import localStorageService from "@/services/localStorageService";
import type { User } from "@/services/userService";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const LOCAL_STORAGE_USER_KEY = "__user__";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(localStorageService.getUser());

  watch(user, (userValue) => {
    if (userValue) {
      localStorageService.setUser(userValue);
    }
  });

  const setUser = (newUser: User): void => {
    user.value = newUser;
  };

  return { user, setUser };
});
