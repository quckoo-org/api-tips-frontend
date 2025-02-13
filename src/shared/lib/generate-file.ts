import dayjs from "dayjs";
import { formatDate } from "@/shared/lib/format-date";

export const generateFile = (
  data: Blob | Uint8Array,
  name: string,
  hasDate: boolean = true,
  extension = ".xlsx",
) => {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${name ?? "Unknown"}${
      hasDate ? `_${formatDate(dayjs().toDate())}` : ""
    }${extension}`,
  );
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 2000);
};
