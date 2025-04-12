import dayjs from "dayjs";

export const formatDate = (date: string | Date, format: "MM-DD-YYYY" | "YYYY-MM-DD" | "DD-MM-YYYY") => {
  return dayjs(date).format(format);
};
