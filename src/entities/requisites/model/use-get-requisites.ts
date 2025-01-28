"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRequisitesClient } from "@/shared/grpc/clients/use-requisites-client";
import { QUERY_KEYS } from "@/shared/lib";

export const useGetRequisites = () => {
  const { getAllRequisites } = useRequisitesClient();

  return useQuery({
    queryKey: [QUERY_KEYS.REQUISITES],
    queryFn: async ({ signal }) => {
      const response = await getAllRequisites({}, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
