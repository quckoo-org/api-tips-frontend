import axios from "axios";
export const fetchClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "https://beta.api-tips.api.quckoo.net",
  withCredentials: true,
});
