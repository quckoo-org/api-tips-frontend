import { useState } from "react";
import { CreateInvoiceModal } from "@/features/manage-invoices";
import { Invoice } from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

export const useCreateInvoiceModal = () => {
  const [modalProps, setModalProps] = useState<{
    onSuccess?: () => void;
    onClose: (Invoice?: Invoice) => void;
    orderId?: number;
  }>();

  const modal = modalProps ? <CreateInvoiceModal {...modalProps} /> : undefined;
  const addInvoice = (orderId?: number, onSuccess?: () => void) => {
    return new Promise<Invoice | undefined>((res) => {
      setModalProps({
        onClose: (Invoice) => {
          res(Invoice);
          setModalProps(undefined);
        },
        orderId,
        onSuccess,
      });
    });
  };

  return {
    modal,
    addInvoice,
  };
};
