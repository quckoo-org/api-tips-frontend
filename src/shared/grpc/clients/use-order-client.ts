import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsOrderServiceDefinition } from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const useOrdersClient = () => {
  return useGrpcClient(ApiTipsOrderServiceDefinition);
};
