import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdateUser = () => {
  const { updateUser } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation<UpdateUserResponse, unknown, UpdateUserRequest>({
    mutationFn: async (req) => {
      const response = await updateUser(req);

      return response;
    },
    onSuccess: (userResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.USERS] },
        (oldData: GetUsersResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            users: oldData.users.map((user) =>
              user.id === userResponse?.user?.id ? userResponse?.user : user,
            ),
          };
        },
      );
    },
  });
};
