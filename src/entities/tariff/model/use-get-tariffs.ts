"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTariffsClient } from "@/shared/grpc/clients/use-tariffs-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import { GetTariffsRequest } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";

export const useGetTariffs = (req: GetTariffsRequest) => {
  const { getTariffs } = useTariffsClient();

  return useQuery({
    queryKey: [QUERY_KEYS.TARIFFS, req],
    queryFn: async ({ signal }) => {
      const response = await getTariffs(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
