import { useMutation } from "@tanstack/react-query";
import { useInvoicesClient } from "@/shared/grpc/clients/use-invoices-client";
import { generateFile } from "@/shared/lib";
import {
  GeneratePdfForInvoiceRequest,
  GeneratePdfForInvoiceResponse,
} from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

export const useDownloadInvoice = () => {
  const { generatePdfForInvoice } = useInvoicesClient();

  return useMutation<
    GeneratePdfForInvoiceResponse,
    { description: string },
    GeneratePdfForInvoiceRequest
  >({
    mutationFn: async (req) => {
      const response = await generatePdfForInvoice(req);

      return response;
    },
    onSuccess: (pdfForInvoiceResponse) =>
      generateFile(
        pdfForInvoiceResponse.invoicePdf as unknown as Uint8Array,
        "invoice",
        false,
      ),
  });
};
