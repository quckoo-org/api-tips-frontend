import { Client } from "nice-grpc-web";
import { useGrpcClient } from "../useGrpcClient";

export const useCountriesClient = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const CountryServiceDefinition: Client<object> = {getAllCountries: ({}) => {} }
  return useGrpcClient(CountryServiceDefinition);
};
