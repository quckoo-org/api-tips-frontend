import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
      Cookies.set("accessToken", data.accessToken, {
        expires: 15 * 60 * 1000,
      });
      authStore.login(data.user);
      router.push(ROUTES.HOME);
    },
  });
};
