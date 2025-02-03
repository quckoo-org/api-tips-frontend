"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useInvoicesClient } from "@/shared/grpc/clients/use-invoices-client";
import { QUERY_KEYS } from "@/shared/lib";
import { GetInvoicesResponse } from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

export const useGetInvoices = () => {
  const { getInvoices } = useInvoicesClient();

  return useQuery<GetInvoicesResponse>({
    queryKey: [QUERY_KEYS.INVOICES],
    queryFn: async ({ signal }) => {
      const response = await getInvoices({}, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
