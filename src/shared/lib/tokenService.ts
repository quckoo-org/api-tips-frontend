import { getCookie } from 'cookies-next/client';

export class TokenService {
  static getAccessToken(): string | undefined {
      return getCookie('accessToken')

  }
}
