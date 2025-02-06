import { PaymentType } from "@/shared/proto/custom_enums/v1/custom_enums";

export type ValidPayment = Exclude<PaymentType, PaymentType.UNRECOGNIZED>;

export type PaymentTranslations = Record<ValidPayment, string>;

export type PaymentOption = {
  value: ValidPayment;
  label: string;
};
