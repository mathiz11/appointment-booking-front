import axios from "axios";
import type { ResponseAPI } from "./globalService";

export enum USER_ROLE {
  PRO = "PRO",
  CLIENT = "CLIENT",
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: USER_ROLE;
  token: string;
};

const login = (email: string, password: string): Promise<ResponseAPI<User>> => {
  return axios
    .post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, {
      email,
      password,
    })
    .then((result) => ({
      data: {
        id: result.data.data.id,
        name: result.data.data.name,
        email: result.data.data.email,
        token: result.data.token,
        role: result.data.data.role as USER_ROLE,
      },
    }))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

const userService = {
  login,
};

export default userService;
