import type { MessageOptions } from "naive-ui";
import localStorageService from "./localStorageService";

export type ResponseAPI<T> = {
  data?: T;
  error?: string;
};

export const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${localStorageService.getUser()?.token}`,
  },
});

export const ERROR_MESSAGE_OPTIONS: MessageOptions = {
  closable: true,
  duration: 600,
};
