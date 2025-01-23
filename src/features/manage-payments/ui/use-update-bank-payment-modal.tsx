import { useState } from "react";
import { BankAccountPayment } from "@/entities/payment";
import { Payment } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";
import { UpdateBankPaymentModal } from "./update-bank-payment-modal";

export function useUpdateBankPaymentModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (payment?: Payment) => void;
    payment: BankAccountPayment;
  }>();

  const modal = modalProps ? (
    <UpdateBankPaymentModal {...modalProps} />
  ) : undefined;

  const updatePayment = (payment: BankAccountPayment) => {
    return new Promise<Payment | undefined>((res) => {
      setModalProps({
        onClose: (payment) => {
          res(payment);
          setModalProps(undefined);
        },
        payment,
      });
    });
  };

  return {
    modal,
    updatePayment,
  };
}
