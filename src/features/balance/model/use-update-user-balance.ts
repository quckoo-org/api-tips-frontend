"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  UpdateBalanceRequest,
  UpdateBalanceResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useUpdateUserBalance = () => {
  const queryClient = useQueryClient();
  const { updateBalance } = useHistoryClient();
  return useMutation<UpdateBalanceResponse, unknown, UpdateBalanceRequest>({
    mutationFn: async (req) => {
      const response = await updateBalance(req);

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DETAILED_HISTORIES],
      });
    },
  });
};
