import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInvoicesClient } from "@/shared/grpc/clients/use-invoices-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  GetInvoicesResponse,
} from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

export const useCreateInvoice = () => {
  const { createInvoice } = useInvoicesClient();
  const queryClient = useQueryClient();

  return useMutation<
    CreateInvoiceResponse,
    { description: string },
    CreateInvoiceRequest
  >({
    mutationFn: async (req) => {
      const response = await createInvoice(req);

      return response;
    },
    onSuccess: (orderResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.INVOICES] },
        (oldData: GetInvoicesResponse | undefined) => {
          if (!oldData || !orderResponse.invoice) return oldData;

          return {
            ...oldData,
            invoices: [...oldData.invoices, orderResponse.invoice],
          };
        },
      );
    },
  });
};
