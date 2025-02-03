import { useMemo } from "react";
import {
  PaymentOption,
  PaymentTranslations,
  ValidPayment,
} from "@/entities/invoices/model/types";
import { useTranslations } from "@/shared/locale/translations";
import { PaymentType } from "@/shared/proto/custom_enums/v1/custom_enums";

export const useInvoicesPaymentType = () => {
  const { t } = useTranslations();

  const translations: PaymentTranslations = {
    [PaymentType.PAYMENT_TYPE_BANK]: t("invoices_payment_type_bank"),
    [PaymentType.PAYMENT_TYPE_CRYPTO]: t("invoices_payment_type_crypto"),
    [PaymentType.PAYMENT_TYPE_UNSPECIFIED]: t(
      "invoices_payment_type_unspecified",
    ),
  };
  const excludedValues = useMemo(
    () => [PaymentType.UNRECOGNIZED, PaymentType.PAYMENT_TYPE_UNSPECIFIED],
    [],
  );
  const getInvoicePaymentType = (paymentType: ValidPayment) =>
    translations[paymentType];

  const getAllPaymentsOptions = (): PaymentOption[] => {
    return Object.values(PaymentType)
      .filter((value): value is ValidPayment => !excludedValues.includes(value))
      .map((value) => ({
        value,
        label: translations[value],
      }));
  };

  return { getInvoicePaymentType, getAllPaymentsOptions };
};
