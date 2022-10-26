import { LOCAL_STORAGE_USER_KEY } from "@/stores/user";
import type { User } from "./userService";

const getUser = (): User | null => {
  const localStorageUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  return localStorageUser ? (JSON.parse(localStorageUser) as User) : null;
};

const setUser = (user: User): void => {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
};

const removeUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
};

const localStorageService = { getUser, setUser, removeUser };

export default localStorageService;
