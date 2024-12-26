import axios from "axios";
export const fetchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APU_URL ?? "http://localhost:5000",
  withCredentials: true,
});
