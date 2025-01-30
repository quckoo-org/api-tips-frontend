import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "@/shared/utils/fetchClient";
import {
  RecoveryCodeErrorT,
  RecoveryCodeReqT,
  ChangePasswordResT,
} from "./types";

export const useChangePassword = () => {
  return useMutation<ChangePasswordResT, RecoveryCodeErrorT, RecoveryCodeReqT>({
    mutationFn: async (req) => {
      const response = await fetchClient.post<ChangePasswordResT>(
        "/api/auth/change-password",
        req,
      );

      return response.data;
    },
  });
};
