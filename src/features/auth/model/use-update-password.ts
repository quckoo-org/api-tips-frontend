import { useMutation } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import {
  ChangeUserPasswordRequest,
  ChangeUserPasswordResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdatePassword = () => {
  const { changeUserPassword } = useAccessClient();

  return useMutation<
    ChangeUserPasswordResponse,
    unknown,
    ChangeUserPasswordRequest
  >({
    mutationFn: async (req) => {
      const response = await changeUserPassword(req);

      return response;
    },
  });
};
