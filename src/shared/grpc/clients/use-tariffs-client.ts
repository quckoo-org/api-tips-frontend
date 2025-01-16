import { useGrpcClient } from "@/shared/grpc/useGrpcClient";
import { ApiTipsTariffServiceDefinition } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";

export const useTariffsClient = () => {
  return useGrpcClient(ApiTipsTariffServiceDefinition);
};
