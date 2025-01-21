"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { OrderT } from "@/entities/order";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
// import {
//   GetAllOrdersRequest,
//   GetAllOrdersResponse,
// } from "@/shared/proto/user/v1/user";
//TODO MOCK TYPE
type GetAllOrdersRequest = unknown;
type GetAllOrdersResponse = { orders: OrderT[] };

export const useGetOrders = (req: GetAllOrdersRequest) => {
  const { getAllOrders } = useOrdersClient();

  return useQuery<GetAllOrdersResponse>({
    queryKey: [QUERY_KEYS.USERS, req],
    queryFn: async ({ signal }) => {
      const response = await getAllOrders(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
