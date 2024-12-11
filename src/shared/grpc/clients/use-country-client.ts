import { CountryServiceDefinition } from "@/shared/proto/country/v1/country";
import { useGrpcClient } from "../useGrpcClient";

export const useCountriesClient = () => {
  return useGrpcClient(CountryServiceDefinition);
};
