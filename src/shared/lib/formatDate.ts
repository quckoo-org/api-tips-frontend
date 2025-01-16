import dayjs from "@/shared/lib/dayjs-in";

export const formatDate = (
  date: Date | undefined,
  format: string = "DD.MM.YYYY",
) => {
  if (!date) return null;
  return dayjs(date).format(format);
};
