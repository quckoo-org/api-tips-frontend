import { useQuery } from "@tanstack/react-query";
import { useCountriesClient } from "@/shared/grpc/clients/use-country-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";

export const useGetCountries = () => {
  const { getAllCountries } = useCountriesClient();

  return useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES],
    queryFn: async () => {
      const response = await getAllCountries({});

      return response;
    },
    select: (data) => {
      return data.countries.map((c) => ({
        value: c.id.toString(),
        label: c.name,
      }));
    },
  });
};
