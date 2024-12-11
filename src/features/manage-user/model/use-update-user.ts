import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import {
  ListUsersResponse,
  UpdateUserRequest,
  UserResponse,
} from "@/shared/proto/user/v1/user";

export const useUpdateUser = () => {
  const { updateUser } = useUsersClient();
  const queryClient = useQueryClient();

  return useMutation<UserResponse, unknown, UpdateUserRequest>({
    mutationFn: async (req) => {
      const response = await updateUser(req);

      return response;
    },
    onSuccess: (userResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.USERS] },
        (oldData: ListUsersResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            rows: oldData.rows.map((user) =>
              user.id === userResponse?.user?.id ? userResponse?.user : user,
            ),
          };
        },
      );
    },
  });
};
