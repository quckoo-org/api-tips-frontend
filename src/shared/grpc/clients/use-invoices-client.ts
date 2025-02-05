import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsInvoiceServiceDefinition } from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

export const useInvoicesClient = () => {
  return useGrpcClient(ApiTipsInvoiceServiceDefinition);
};
