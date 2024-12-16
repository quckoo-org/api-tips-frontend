import axios from 'axios';

export const fetchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRPC_URL,
  withCredentials: true, // Для работы с куками
});
