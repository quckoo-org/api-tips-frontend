import {
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
} from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

export interface CreateInvoiceFormValuesT
  extends Omit<CreateInvoiceRequest, "totalAmount" | "orderId"> {
  totalAmount: number | undefined;
  orderId: string;
}

export type UpdateInvoiceFormValuesT = Omit<UpdateInvoiceRequest, "invoiceId">;
