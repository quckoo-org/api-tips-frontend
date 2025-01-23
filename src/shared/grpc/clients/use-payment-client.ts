import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsPaymentServiceDefinition } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";

export const usePaymentClient = () => {
  return useGrpcClient(ApiTipsPaymentServiceDefinition);
};
