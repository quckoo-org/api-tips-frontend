"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTariffsClient } from "@/shared/grpc/clients/use-tariffs-client";
import { QUERY_KEYS } from "@/shared/lib";

export const useGetClientTariffs = () => {
  const { getTariffsForClient } = useTariffsClient();

  return useQuery({
    queryKey: [QUERY_KEYS.TARIFFS],
    queryFn: async ({ signal }) => {
      const response = await getTariffsForClient({}, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
