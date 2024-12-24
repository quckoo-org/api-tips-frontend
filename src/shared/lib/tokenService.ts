import { getCookie, OptionsType, setCookie } from "cookies-next/client";

export class TokenService {
  static getAccessToken(): string | undefined {
    return getCookie("accessToken");
  }

  static setAccessToken(value: string, options?: OptionsType): void {
    setCookie("accessToken", value, options);
  }
}
