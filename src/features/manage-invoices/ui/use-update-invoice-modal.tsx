import { useState } from "react";
import { UpdateInvoiceModal } from "@/features/manage-invoices";
import { Invoice } from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

export const useUpdateInvoiceModal = () => {
  const [modalProps, setModalProps] = useState<{
    invoice: Invoice;
    onClose: (invoice?: Invoice) => void;
  }>();

  const modal = modalProps ? <UpdateInvoiceModal {...modalProps} /> : undefined;

  const updateInvoice = (invoice: Invoice) => {
    return new Promise<Invoice | undefined>((res) => {
      setModalProps({
        onClose: (invoice) => {
          res(invoice);
          setModalProps(undefined);
        },
        invoice,
      });
    });
  };

  return {
    modal,
    updateInvoice,
  };
};
