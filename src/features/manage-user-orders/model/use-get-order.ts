import { useQuery } from "@tanstack/react-query";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetOrderRequest,
  GetOrderResponse,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const useGetOrder = (req: GetOrderRequest) => {
  const { getOrder } = useOrdersClient();

  return useQuery<GetOrderResponse>({
    queryKey: [QUERY_KEYS.USER, req],
    enabled: !!req.orderId,
    queryFn: async ({ signal }) => {
      const response = await getOrder(req, { signal });

      return response;
    },
  });
};
