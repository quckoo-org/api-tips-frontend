"use client";

import { useQuery } from "@tanstack/react-query";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetHistoriesRequest,
  GetHistoriesResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useGetHistories = (req: GetHistoriesRequest) => {
  const { getHistories } = useHistoryClient();
  return useQuery<GetHistoriesResponse>({
    queryKey: [QUERY_KEYS.HISTORIES, req],
    queryFn: async ({ signal }) => {
      const response = await getHistories(req, { signal });

      return response;
    },
  });
};
