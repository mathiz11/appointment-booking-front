import axios from "axios";
import { getHeaders, type ResponseAPI } from "./globalService";

export type Store = {
  id: number;
  name: string;
  address: string;
};

const getByUserId = (userId: number): Promise<ResponseAPI<Store>> => {
  return axios
    .get(
      `${import.meta.env.VITE_API_ENDPOINT}/stores/user/${userId}`,
      getHeaders()
    )
    .then((result) => ({
      data: result.data.data as Store,
    }))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

const storeService = { getByUserId };

export default storeService;
