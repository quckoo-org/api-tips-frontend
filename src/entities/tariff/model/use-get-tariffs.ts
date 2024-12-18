"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTariffsClient } from "@/shared/grpc/clients/use-tariffs-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";

export const useGetTariffs = (req: unknown) => {
  const { getAllTariffs } = useTariffsClient();

  return useQuery<unknown>({
    queryKey: [QUERY_KEYS.TARIFFS, req],
    queryFn: async ({ signal }) => {
      const response = await getAllTariffs(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
