"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { CryptoWalletPayment } from "@/entities/payment";
import {
  cryptoCurrencyTypeToCryptoCurrency,
  CryptoPaymentFormValues,
} from "@/features/manage-payments/model/types";
import { PaymentCryptoForm } from "@/features/manage-payments/ui/payment-crypto-form";
import { useTranslations } from "@/shared/locale/translations";
import { Payment } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";
import { useUpdatePayment } from "../model/use-update-payment";

type UpdatePaymentModalProps = {
  className?: string;
  onClose: (payment?: Payment) => void;
  payment: CryptoWalletPayment;
};

export const UpdateCryptoPaymentModal: FC<UpdatePaymentModalProps> = ({
  className,
  onClose,
  payment,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdatePayment();

  const onUpdatePayment = async (paymentData: CryptoPaymentFormValues) => {
    const { isBanned, ...paymentType } = paymentData;
    const response = await updateMutation.mutateAsync({
      payment: {
        id: payment.id,
        isBanned: isBanned,
        PaymentType: {
          $case: "cryptoWallet",
          value: {
            ...paymentType,
            cryptoCurrencyType:
              cryptoCurrencyTypeToCryptoCurrency[
                paymentType.cryptoCurrencyType
              ],
          },
        },
      },
    });
    onClose(response.payment);
  };

  return (
    <Modal
      title={t("update_crypto_payment")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <PaymentCryptoForm
        onSuccess={onUpdatePayment}
        payment={payment}
        isLoading={updateMutation.isPending}
      />
    </Modal>
  );
};
