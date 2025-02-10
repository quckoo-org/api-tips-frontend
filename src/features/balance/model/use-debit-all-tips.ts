"use client";

import { useMutation } from "@tanstack/react-query";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import {
  DebitAllTipsRequest,
  DebitAllTipsResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useDebitAllTips = () => {
  const { debitAllTips } = useHistoryClient();
  return useMutation<DebitAllTipsResponse, unknown, DebitAllTipsRequest>({
    mutationFn: async (req) => {
      const response = await debitAllTips(req);

      return response;
    },
  });
};
