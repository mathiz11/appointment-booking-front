import axios from "axios";
import { getHeaders, type ResponseAPI } from "./globalService";

export type TimeRange = {
  id?: number;
  startDate: Date | string;
  endDate: Date | string;
  storeId: number | null;
  reservationId: number | null;
};

export type TimeRangeFilter = {
  storeId?: number;
  reservationId?: number;
};

const getAll = (
  filters?: TimeRangeFilter
): Promise<ResponseAPI<TimeRange[]>> => {
  return axios
    .get(`${import.meta.env.VITE_API_ENDPOINT}/time-ranges`, {
      ...getHeaders(),
      params: filters,
    })
    .then((result) => ({
      data: result.data.data as TimeRange[],
    }))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

const getAllByDate = (
  date: Date,
  filters?: TimeRangeFilter
): Promise<ResponseAPI<TimeRange[]>> => {
  return axios
    .post(
      `${import.meta.env.VITE_API_ENDPOINT}/time-ranges/date`,
      { date },
      {
        ...getHeaders(),
        params: filters,
      }
    )
    .then((result) => ({
      data: result.data.data as TimeRange[],
    }))
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

const create = (timeRange: TimeRange): Promise<ResponseAPI<void>> => {
  return axios
    .post(
      `${import.meta.env.VITE_API_ENDPOINT}/time-ranges`,
      timeRange,
      getHeaders()
    )
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

const timeRangeService = {
  getAll,
  getAllByDate,
  create,
};

export default timeRangeService;
