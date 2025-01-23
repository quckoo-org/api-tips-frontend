"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { BankAccountPayment } from "@/entities/payment";
import { BankPaymentFormValues } from "@/features/manage-payments/model/types";
import { useTranslations } from "@/shared/locale/translations";
import { Payment } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";
import { PaymentBankForm } from "./payment-bank-form";
import { useUpdatePayment } from "../model/use-update-payment";

type UpdatePaymentModalProps = {
  className?: string;
  onClose: (payment?: Payment) => void;
  payment: BankAccountPayment;
};

export const UpdateBankPaymentModal: FC<UpdatePaymentModalProps> = ({
  className,
  onClose,
  payment,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdatePayment();

  const onUpdatePayment = async (paymentData: BankPaymentFormValues) => {
    const { isBanned, ...PaymentType } = paymentData;
    const response = await updateMutation.mutateAsync({
      payment: {
        id: payment.id,
        isBanned: isBanned,
        PaymentType: {
          $case: "bankAccount",
          value: PaymentType,
        },
      },
    });
    onClose(response.payment);
  };

  return (
    <Modal
      title={t("update_bank_payment")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <PaymentBankForm
        onSuccess={onUpdatePayment}
        payment={payment}
        isLoading={updateMutation.isPending}
      />
    </Modal>
  );
};
