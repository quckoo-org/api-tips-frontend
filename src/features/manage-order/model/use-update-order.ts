import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderT } from "@/entities/order";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
// import {
//   GetAllOrdersResponse,
//   UpdateOrderRequest,
//   UpdateOrderResponse,
// } from "@/shared/proto/order/v1/order";
//TODO MOCK TYPE
type GetAllOrdersResponse = { orders: OrderT[] };
type UpdateOrderRequest = unknown;
type UpdateOrderResponse = { order: OrderT };

export const useUpdateOrder = () => {
  const { updateOrder } = useOrdersClient();
  const queryClient = useQueryClient();

  return useMutation<UpdateOrderResponse, unknown, UpdateOrderRequest>({
    mutationFn: async (req) => {
      const response = await updateOrder(req);

      return response;
    },
    onSuccess: (orderResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.USERS] },
        (oldData: GetAllOrdersResponse | undefined) => {
          if (!oldData) return oldData;
          console.log(orderResponse, oldData);
          return {
            ...oldData,
            orders: oldData.orders.map((order) =>
              order.id === orderResponse?.order?.id
                ? orderResponse?.order
                : order,
            ),
          };
        },
      );
    },
  });
};
