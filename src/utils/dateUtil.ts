import { format } from "date-fns";

const formatTimeFromString = (date: Date | string) =>
  format(date instanceof Date ? date : new Date(date), "HH:mm");

const dateUtil = { formatTimeFromString };

export default dateUtil;
