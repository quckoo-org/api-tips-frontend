import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetUserDetailedResponse,
  UpdateAccessTokenRequest,
  UpdateAccessTokenResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdateTipsToken = () => {
  const { updateAccessToken } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation<
    UpdateAccessTokenResponse,
    unknown,
    UpdateAccessTokenRequest
  >({
    mutationFn: async (req) => {
      const response = await updateAccessToken(req);

      return response;
    },
    onSuccess: (tipsTokenResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.DETAILED_USER] },
        (oldData: GetUserDetailedResponse | undefined) => {
          if (!oldData || !tipsTokenResponse?.user) return oldData;
          return {
            ...oldData,
            detailedUser: tipsTokenResponse.user,
          };
        },
      );
    },
  });
};
