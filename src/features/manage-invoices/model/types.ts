import {
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
} from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

export interface CreateInvoiceFormValuesT
  extends Omit<CreateInvoiceRequest, "totalAmount"> {
  totalAmount: number;
}

export type UpdateInvoiceFormValuesT = Omit<UpdateInvoiceRequest, "invoiceId">;
