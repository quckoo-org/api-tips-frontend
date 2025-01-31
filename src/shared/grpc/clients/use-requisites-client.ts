import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsRequisitesServiceDefinition } from "@/shared/proto/api_tips_requisites/v1/api_tips_requisites";

export const useRequisitesClient = () => {
  return useGrpcClient(ApiTipsRequisitesServiceDefinition);
};
