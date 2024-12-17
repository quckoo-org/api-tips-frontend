import axios from 'axios';

export const fetchClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ,
  withCredentials: true, // Для работы с куками
});
