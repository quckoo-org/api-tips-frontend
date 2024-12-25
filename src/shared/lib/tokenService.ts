import { getCookie, OptionsType, setCookie } from "cookies-next/client";
import dayjs from "dayjs";
import { Logger } from "pino";
import { rootLogger } from "@/shared/logger/logger";
import { fetchClient } from "@/shared/utils/fetchClient";

export class TokenService {
  private static logger: Logger = rootLogger.child({ name: "TokenService" });

  static getAccessToken(): string | undefined {
    return getCookie("accessToken");
  }

  static setAccessToken(value: string, options?: OptionsType): void {
    setCookie("accessToken", value, options);
  }

  static refreshToken = async () => {
    try {
      this.logger.debug("Refreshing token");
      const {
        data: { newAccessToken },
      } = await fetchClient.post("/auth/refresh");
      TokenService.setAccessToken(newAccessToken, {
        expires: dayjs().add(15, "minute").toDate(),
      });
      this.logger.debug({ newAccessToken }, "Refreshed token");
      return { newAccessToken };
    } catch (e) {
      this.logger.error(e, "Failed to refresh token...");
      throw e;
    }
  };
}
