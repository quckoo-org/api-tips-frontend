import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  DeleteMethodRequest,
  GetMethodsResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useDeleteMethod = () => {
  const { deleteMethod } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: DeleteMethodRequest) => {
      const response = await deleteMethod(req);

      return response;
    },
    onSuccess: (methodsResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.METHODS] },
        (oldData: GetMethodsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            methods: oldData.methods.filter(
              (method) => method.id !== methodsResponse.methodId,
            ),
          };
        },
      );
    },
  });
};
