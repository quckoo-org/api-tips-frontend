import { useState } from "react";
import { UpdateInvoiceModal } from "@/features/manage-invoices";
import { Invoice } from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

export const useUpdateInvoiceModal = () => {
  const [modalProps, setModalProps] = useState<{
    invoice: Invoice;
    onClose: (Invoice?: Invoice) => void;
  }>();

  const modal = modalProps ? <UpdateInvoiceModal {...modalProps} /> : undefined;

  const updateInvoice = (invoice: Invoice) => {
    return new Promise<Invoice | undefined>((res) => {
      setModalProps({
        onClose: (Invoice) => {
          res(Invoice);
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
