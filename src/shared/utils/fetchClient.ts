import axios from "axios";
export const fetchClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "https://dev.api-tips.api.quckoo.net",
  withCredentials: true,
});
