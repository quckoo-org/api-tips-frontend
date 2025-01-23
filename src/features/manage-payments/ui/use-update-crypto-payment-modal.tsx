import { useState } from "react";
import { CryptoWalletPayment } from "@/entities/payment";
import { UpdateCryptoPaymentModal } from "@/features/manage-payments/ui/update-crypto-payment-modal";
import { Payment } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";

export function useUpdateCryptoPaymentModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (payment?: Payment) => void;
    payment: CryptoWalletPayment;
  }>();

  const modal = modalProps ? (
    <UpdateCryptoPaymentModal {...modalProps} />
  ) : undefined;

  const updateCryptoPayment = (payment: CryptoWalletPayment) => {
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
    updateCryptoPayment,
  };
}
