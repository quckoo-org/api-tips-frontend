import { ApiTipsAccessServiceDefinition } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { useGrpcClient } from "../useGrpcClient";

export const useAccessClient = () => {
  return useGrpcClient(ApiTipsAccessServiceDefinition);
};
