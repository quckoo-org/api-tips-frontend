import axios from "axios";
export const fetchClient = axios.create({
  baseURL: "https://beta.api-tips.api.quckoo.net",
  withCredentials: true,
});
