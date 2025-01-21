import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderT } from "@/entities/order";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
// import {
//   GetAllOrdersResponse,
//   CreateOrderRequest,
//   CreateOrderResponse,
// } from "@/shared/proto/order/v1/order";
//TODO MOCK TYPE
type GetAllOrdersResponse = { orders: OrderT[] };
type CreateOrderRequest = unknown;
type CreateOrderResponse = { order: OrderT };

export const useCreateOrder = () => {
  const { createOrder } = useOrdersClient();
  const queryClient = useQueryClient();

  return useMutation<
    CreateOrderResponse,
    { description: string },
    CreateOrderRequest
  >({
    mutationFn: async (req) => {
      const response = await createOrder(req);

      return response;
    },
    onSuccess: (orderResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.ORDERS] },
        (oldData: GetAllOrdersResponse | undefined) => {
          if (!oldData || !orderResponse.order) return oldData;

          return {
            ...oldData,
            orders: [...oldData.orders, orderResponse.order],
          };
        },
      );
    },
  });
};
