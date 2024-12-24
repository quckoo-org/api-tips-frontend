import { TokenService } from "@/shared/lib/tokenService";
import { fetchClient } from "@/shared/utils/fetchClient";

export const refreshToken = async () => {
  const {
    data: { newAccessToken },
  } = await fetchClient.post("/auth/refresh");
  TokenService.setAccessToken(newAccessToken);
  return { newAccessToken };
};
