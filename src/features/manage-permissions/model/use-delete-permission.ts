import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  DeletePermissionRequest,
  GetPermissionsResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useDeletePermission = () => {
  const { deletePermission } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: DeletePermissionRequest) => {
      const response = await deletePermission(req);

      return response;
    },
    onSuccess: (permissionResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.PERMISSIONS] },
        (oldData: GetPermissionsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            permissions: oldData.permissions.filter(
              (role) => role.id !== permissionResponse.permissionId,
            ),
          };
        },
      );
    },
  });
};
