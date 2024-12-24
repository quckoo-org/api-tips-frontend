import { getCookie, setCookie } from "cookies-next/client";

export class TokenService {
  static getAccessToken(): string | undefined {
    return getCookie("accessToken");
  }

  static setAccessToken(value: string): void {
    setCookie("accessToken", value);
  }
}
