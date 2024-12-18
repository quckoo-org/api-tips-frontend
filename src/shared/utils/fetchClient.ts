import axios from "axios";

export const fetchClient = axios.create({
  baseURL: "http://localhost:8086",
  withCredentials: true,
});
