import type { Store } from "@/services/storeService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStoreStore = defineStore("store", () => {
  const store = ref<Store | null>(null);

  const setStore = (newStore: Store): void => {
    store.value = newStore;
  };
  return { store, setStore };
});
