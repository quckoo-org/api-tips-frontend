"use client";

import { useMutation } from "@tanstack/react-query";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import {
  UpdateBalanceRequest,
  UpdateBalanceResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useUpdateUserBalance = () => {
  const { updateBalance } = useHistoryClient();
  return useMutation<UpdateBalanceResponse, unknown, UpdateBalanceRequest>({
    mutationFn: async (req) => {
      const response = await updateBalance(req);

      return response;
    },
  });
};
