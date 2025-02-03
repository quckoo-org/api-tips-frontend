import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsInvoicesServiceDefinition } from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

export const useInvoicesClient = () => {
  return useGrpcClient(ApiTipsInvoicesServiceDefinition);
};
