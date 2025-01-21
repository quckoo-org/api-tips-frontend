import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  AddUserRequest,
  AddUserResponse,
  GetUsersResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useCreateUser = () => {
  const { addUser } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation<AddUserResponse, unknown, AddUserRequest>({
    mutationFn: async (req) => {
      const response = await addUser(req);

      return response;
    },
    onSuccess: (userResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.USERS] },
        (oldData: GetUsersResponse | undefined) => {
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
