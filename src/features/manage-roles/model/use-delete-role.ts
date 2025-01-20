import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  DeleteRoleRequest,
  GetRolesResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useDeleteRole = () => {
  const { deleteRole } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: DeleteRoleRequest) => {
      const response = await deleteRole(req);

      return response;
    },
    onSuccess: (roleResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.ROLES] },
        (oldData: GetRolesResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            roles: oldData.roles.filter(
              (role) => role.id !== roleResponse.roleId,
            ),
          };
        },
      );
    },
  });
};
