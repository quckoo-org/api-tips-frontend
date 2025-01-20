import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetPermissionsResponse,
  UpdatePermissionRequest,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdatePermission = () => {
  const { updatePermission } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: UpdatePermissionRequest) => {
      const response = await updatePermission(req);

      return response;
    },
    onSuccess: (permissionResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.PERMISSIONS] },
        (oldData: GetPermissionsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            permissions: oldData.permissions.map((role) =>
              role.id === permissionResponse?.permission?.id
                ? permissionResponse?.permission
                : role,
            ),
          };
        },
      );
    },
  });
};
