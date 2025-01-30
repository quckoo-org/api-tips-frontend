import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "@/shared/utils/fetchClient";
import {
  RecoveryPasswordErrorT,
  RecoveryPasswordReqT,
  RecoveryPasswordResT,
} from "./types";

export const usePasswordRecovery = () => {
  return useMutation<
    RecoveryPasswordResT,
    RecoveryPasswordErrorT,
    RecoveryPasswordReqT
  >({
    mutationFn: async (req) => {
      const response = await fetchClient.post<RecoveryPasswordResT>(
        "/api/auth/recovery",
        req,
      );

      return response.data;
    },
  });
};
