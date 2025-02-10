"use client";

import { useQuery } from "@tanstack/react-query";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetDetailedHistoriesRequest,
  GetDetailedHistoriesResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useGetDetailedHistories = (req: GetDetailedHistoriesRequest) => {
  const { getDetailedHistories } = useHistoryClient();
  return useQuery<GetDetailedHistoriesResponse>({
    queryKey: [QUERY_KEYS.DETAILED_HISTORIES, req],
    queryFn: async ({ signal }) => {
      const response = await getDetailedHistories(req, { signal });

      return response;
    },
    enabled: !!req.userId,
  });
};
