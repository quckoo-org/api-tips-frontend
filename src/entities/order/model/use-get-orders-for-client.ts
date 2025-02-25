"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
import { GetOrdersForClientResponse } from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const useGetOrdersForClient = () => {
  const { getOrdersForClient } = useOrdersClient();

  return useQuery<GetOrdersForClientResponse>({
    queryKey: [QUERY_KEYS.CLIENT_ORDERS],
    queryFn: async ({ signal }) => {
      const response = await getOrdersForClient({}, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
