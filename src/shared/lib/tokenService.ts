import { getCookie } from "cookies-next/client";

export class TokenService {
  static getAccessToken(): string | undefined {
    return getCookie("accessToken");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static setAccessToken(arg: unknown): string | undefined {
    return getCookie("accessToken");
  }
}
