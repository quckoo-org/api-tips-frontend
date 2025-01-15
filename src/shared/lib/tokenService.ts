import {
  getCookie,
  OptionsType,
  setCookie,
  deleteCookie,
} from "cookies-next/client";
import dayjs from "dayjs";
import { Logger } from "pino";
import { rootLogger } from "@/shared/logger/logger";
import { fetchClient } from "@/shared/utils/fetchClient";

export class TokenService {
  private static logger: Logger = rootLogger.child({ name: "TokenService" });

  static getAccessToken(): string | undefined {
    return getCookie("jwt");
  }

  static async setAccessToken(value: string, options?: OptionsType) {
    setCookie("jwt", value, options);
  }

  // eslint-disable-next-line
  static refreshToken = async (onError?: () => any) => {
    try {
      this.logger.debug("Refreshing token");
      const {
        data: { Jwt: newAccessToken },
      } = await fetchClient.post("/api/auth/refresh");
      await this.setAccessToken(newAccessToken, {
        expires: dayjs().add(60, "minute").toDate(),
      });
      this.logger.debug("Refreshed token " + newAccessToken);
      return { newAccessToken };
    } catch (e) {
      deleteCookie("jwt");
      this.logger.error(e, "Failed to refresh token...");
      if (onError) {
        onError();
      }
      throw e;
    }
  };
}
