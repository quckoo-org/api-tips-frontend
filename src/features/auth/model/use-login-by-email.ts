import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TokenService } from "@/shared/lib/tokenService";
import { ROUTES } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";
import { fetchClient } from "@/shared/utils/fetchClient";
import {
  LoginByEmailErrorT,
  LoginByEmailReqT,
  LoginByEmailResT,
} from "./types";

export const useLoginByEmail = () => {
  const router = useRouter();

  return useMutation<LoginByEmailResT, LoginByEmailErrorT, LoginByEmailReqT>({
    mutationFn: async (req) => {
      const response = await fetchClient.post<LoginByEmailResT>(
        "/auth/login",
        req,
      );

      return response.data;
    },
    onSuccess: (data) => {
      TokenService.setAccessToken(data.accessToken);
      authStore.login(data.user);
      router.push(ROUTES.HOME);
    },
  });
};
