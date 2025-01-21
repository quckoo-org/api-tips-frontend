import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  AddPermissionRequest,
  GetPermissionsResponse,
  Permission,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useCreatePermission = () => {
  const { addPermission } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: AddPermissionRequest) => {
      const response = await addPermission(req);

      return response;
    },
    onSuccess: (permissionResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.PERMISSIONS] },
        (oldData: GetPermissionsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            permissions: [
              ...oldData.permissions,
              permissionResponse.permission,
            ].filter(
              (permission): permission is Permission =>
                permission !== undefined,
            ),
          };
        },
      );
    },
  });
};
