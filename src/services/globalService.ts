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
  duration: 5000,
};

export const SUCCESS_MESSAGE_OPTIONS: MessageOptions = {
  duration: 5000,
};
