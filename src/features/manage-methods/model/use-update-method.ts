import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetMethodsResponse,
  UpdateMethodRequest,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdateMethod = () => {
  const { updateMethod } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: UpdateMethodRequest) => {
      const response = await updateMethod(req);

      return response;
    },
    onSuccess: (methodsResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.METHODS] },
        (oldData: GetMethodsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            methods: oldData.methods.map((method) =>
              method.id === methodsResponse?.method?.id
                ? methodsResponse?.method
                : method,
            ),
          };
        },
      );
    },
  });
};
