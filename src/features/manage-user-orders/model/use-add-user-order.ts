import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  AddOrderRequest,
  AddOrderResponse,
  GetOrdersResponse,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const useAddUserOrder = () => {
  const { addOrder } = useOrdersClient();
  const queryClient = useQueryClient();

  return useMutation<
    AddOrderResponse,
    { description: string },
    AddOrderRequest
  >({
    mutationFn: async (req) => {
      const response = await addOrder(req);

      return response;
    },
    onSuccess: (orderResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.CLIENT_ORDERS] },
        (oldData: GetOrdersResponse | undefined) => {
          if (!oldData || !orderResponse.order) return oldData;
          console.log(orderResponse);
          return {
            ...oldData,
            orders: [...oldData.orders, orderResponse.order],
          };
        },
      );
    },
  });
};
