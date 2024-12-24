import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ROUTES } from "@/shared/router";
import { fetchClient } from "@/shared/utils/fetchClient";
import { RegisterErrorT, RegisterReqT } from "./types";

export const useRegisterUser = () => {
  const router = useRouter();

  return useMutation<unknown, RegisterErrorT, RegisterReqT>({
    mutationFn: async (req) => {
      const response = await fetchClient.post("/auth/register", req);

      return response;
    },
    onSuccess: () => {
      notifications.show({
        title: "Registration Successful",
        message: "Please check your email to verify your account.",
        color: "teal",
      });
      toast.success(
        "Registration Successful. Please check your email to verify your account.",
        { duration: 5000 },
      );
      router.push(ROUTES.LOGIN);
    },
  });
};
