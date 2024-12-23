import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import {
  CreateUserRequest,
  CreateUserResponse,
  GetAllUsersResponse,
} from "@/shared/proto/user/v1/user";

export const useCreateUser = () => {
  const { createUser } = useUsersClient();
  const queryClient = useQueryClient();

  return useMutation<CreateUserResponse, unknown, CreateUserRequest>({
    mutationFn: async (req) => {
      const response = await createUser(req);

      return response;
    },
    onSuccess: (userResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.USERS] },
        (oldData: GetAllUsersResponse | undefined) => {
          if (!oldData || !userResponse.user) return oldData;

          return {
            ...oldData,
            users: [...oldData.users, userResponse.user],
          };
        },
      );
    },
  });
};
