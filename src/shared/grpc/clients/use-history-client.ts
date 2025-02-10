import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsBalanceServiceDefinition } from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useHistoryClient = () => {
  return useGrpcClient(ApiTipsBalanceServiceDefinition);
};
