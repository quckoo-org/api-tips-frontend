import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetRolesResponse,
  UpdateRoleRequest,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdateRole = () => {
  const { updateRole } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: UpdateRoleRequest) => {
      const response = await updateRole(req);

      return response;
    },
    onSuccess: (roleResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.ROLES] },
        (oldData: GetRolesResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            roles: oldData.roles.map((role) =>
              role.id === roleResponse?.role?.id ? roleResponse?.role : role,
            ),
          };
        },
      );
    },
  });
};
