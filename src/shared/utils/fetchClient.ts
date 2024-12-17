import axios from 'axios';

const URI = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_HTTP1_PORT
    ? `http://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_HTTP1_PORT}`
    : 'http://api-tips-backend:3000';

export const fetchClient = axios.create({
  baseURL: URI,
  withCredentials: true,
});
