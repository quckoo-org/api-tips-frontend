import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequisitesClient } from "@/shared/grpc/clients/use-requisites-client";
import { QUERY_KEYS } from "@/shared/lib";

import {
  GetAllRequisitesResponse,
  SetRequisiteActivityRequest,
  SetRequisiteActivityResponse,
} from "@/shared/proto/api_tips_requisites/v1/api_tips_requisites";

export const useBanRequisities = () => {
  const { setRequisiteActivity } = useRequisitesClient();
  const queryClient = useQueryClient();

  return useMutation<
    SetRequisiteActivityResponse,
    { description: string },
    SetRequisiteActivityRequest
  >({
    mutationFn: async (req) => {
      const response = await setRequisiteActivity(req);

      return response;
    },
    onSuccess: (requisitiesResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.REQUISITES] },
        (oldData: GetAllRequisitesResponse | undefined) => {
          if (!oldData || !requisitiesResponse) return oldData;
          return {
            ...oldData,
            bankAccount:
              oldData.bankAccount?.requisiteId ===
              requisitiesResponse.requisiteId
                ? {
                    ...oldData.bankAccount,
                    isBanned: requisitiesResponse.isBanned,
                  }
                : oldData.bankAccount,
            cryptoWallet:
              oldData.cryptoWallet?.requisiteId ===
              requisitiesResponse.requisiteId
                ? {
                    ...oldData.cryptoWallet,
                    isBanned: requisitiesResponse.isBanned,
                  }
                : oldData.cryptoWallet,
          };
        },
      );
    },
  });
};
