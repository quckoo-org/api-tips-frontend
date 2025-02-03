import { useState } from "react";
import { CreateInvoiceModal } from "@/features/manage-invoices";
import { Invoice } from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

export const useCreateInvoiceModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (Invoice?: Invoice) => void;
  }>();

  const modal = modalProps ? <CreateInvoiceModal {...modalProps} /> : undefined;

  const addInvoice = () => {
    return new Promise<Invoice | undefined>((res) => {
      setModalProps({
        onClose: (Invoice) => {
          res(Invoice);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    addInvoice,
  };
};
