import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInvoicesClient } from "@/shared/grpc/clients/use-invoices-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetInvoicesResponse,
  UpdateInvoiceRequest,
  UpdateInvoiceResponse,
} from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

export const useUpdateInvoice = () => {
  const { updateInvoice } = useInvoicesClient();
  const queryClient = useQueryClient();

  return useMutation<
    UpdateInvoiceResponse,
    { description: string },
    UpdateInvoiceRequest
  >({
    mutationFn: async (req) => {
      const response = await updateInvoice(req);

      return response;
    },
    onSuccess: (invoicesResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.INVOICES] },
        (oldData: GetInvoicesResponse | undefined) => {
          if (!oldData || !invoicesResponse.invoice) return oldData;

          return {
            ...oldData,
            invoices: oldData.invoices.map((invoice) =>
              invoice.guid === invoicesResponse.invoice?.guid
                ? invoicesResponse.invoice!
                : invoice,
            ),
          };
        },
      );
    },
  });
};
