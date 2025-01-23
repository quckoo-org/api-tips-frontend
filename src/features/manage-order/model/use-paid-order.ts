import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetOrdersResponse,
  SetOrderStatusPaidRequest,
  SetOrderStatusPaidResponse,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const usePaidOrder = () => {
  const { setOrderStatusPaid } = useOrdersClient();
  const queryClient = useQueryClient();

  return useMutation<
    SetOrderStatusPaidResponse,
    unknown,
    SetOrderStatusPaidRequest
  >({
    mutationFn: async (req) => {
      const response = await setOrderStatusPaid(req);

      return response;
    },
    onSuccess: (orderResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.ORDERS] },
        (oldData: GetOrdersResponse | undefined) => {
          if (!oldData) return oldData;
          console.log(orderResponse, oldData);
          return {
            ...oldData,
            orders: oldData.orders.map((order) =>
              order.id === orderResponse?.order?.id
                ? { ...order, orderStatus: orderResponse.order.orderStatus }
                : order,
            ),
          };
        },
      );
    },
  });
};
