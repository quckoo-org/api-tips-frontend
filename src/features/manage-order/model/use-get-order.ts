import { useQuery } from "@tanstack/react-query";
import { useOrdersClient } from "@/shared/grpc/clients/use-order-client";
import { QUERY_KEYS } from "@/shared/lib";
// import { GetOrderRequest } from "@/shared/proto/user/v1/user";
//TODO MOCK TYPE
type GetOrderRequest = {
  orderId: number;
};

export const useGetOrder = (req: Partial<GetOrderRequest>) => {
  const { getOrder } = useOrdersClient();

  return useQuery({
    queryKey: [QUERY_KEYS.USER, req],
    enabled: !!req.orderId,
    queryFn: async ({ signal }) => {
      const response = await getOrder(req, { signal });

      return response;
    },
  });
};
