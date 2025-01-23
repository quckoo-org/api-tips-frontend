"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetOrdersRequest,
  GetOrdersResponse,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const useGetOrders = (req: GetOrdersRequest) => {
  const { getOrders } = useOrdersClient();

  return useQuery<GetOrdersResponse>({
    queryKey: [QUERY_KEYS.ORDERS, req],
    queryFn: async ({ signal }) => {
      const response = await getOrders(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
