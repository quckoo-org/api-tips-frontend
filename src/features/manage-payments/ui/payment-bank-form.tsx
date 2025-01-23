"use client";

import {
  Button,
  Checkbox,
  Flex,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { clsx } from "clsx";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BankAccountPayment } from "@/entities/payment";
import { BankPaymentFormValues } from "@/features/manage-payments/model/types";
import { useTranslations } from "@/shared/locale/translations";

type PaymentFormProps = {
  className?: string;
  payment?: BankAccountPayment;
  onSuccess: (payment: BankPaymentFormValues) => void;
  isLoading?: boolean;
};

export const PaymentBankForm: FC<PaymentFormProps> = ({
  className,
  onSuccess,
  payment,
  isLoading,
}) => {
  const { t } = useTranslations();
  const [showUnchangedError, setShowUnchangedError] = useState<boolean>(false);
  const defaultValues: Partial<BankPaymentFormValues> = {
    bankAddress: payment?.bankAddress,
    bankName: payment?.bankName,
    iban: payment?.iban,
    additionalInfo: payment?.additionalInfo,
    accountNumber: payment?.accountNumber,
    swift: payment?.swift,
    isBanned: payment?.isBanned,
  };
  const { control, register, handleSubmit, watch } =
    useForm<BankPaymentFormValues>({
      defaultValues,
    });

  const currentValues = watch();

  const onSubmit = (data: BankPaymentFormValues) => {
    const isUnchanged =
      JSON.stringify(currentValues) === JSON.stringify(defaultValues);
    if (isUnchanged) {
      setShowUnchangedError(true);
      return;
    }
    setShowUnchangedError(false);
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <TextInput
          label={t("bank_name")}
          placeholder={t("enter_bank_name")}
          {...register("bankName")}
        />
        <TextInput
          label={t("bank_address")}
          placeholder={t("enter_bank_address")}
          {...register("bankAddress")}
        />
        <TextInput
          label={t("swift")}
          placeholder={t("enter_swift")}
          {...register("swift")}
        />
        <Controller
          name="accountNumber"
          control={control}
          render={({ field }) => (
            <NumberInput
              label={t("account_number")}
              hideControls
              allowNegative={false}
              allowDecimal={false}
              value={field.value}
              placeholder={t("enter_account_number")}
              onChange={field.onChange}
            />
          )}
        />
        <TextInput
          label={t("iban")}
          placeholder={t("enter_iban")}
          {...register("iban", { required: t("iban_is_required") })}
        />
        <TextInput
          label={t("additional_info")}
          placeholder={t("enter_additional_info")}
          {...register("additionalInfo")}
        />
        <Checkbox label={t("is_banned")} {...register("isBanned")} />
        <Button type="submit" loading={isLoading}>
          {t("submit")}
        </Button>
        {showUnchangedError && (
          <Text className="text-center text-sm text-red-600">
            {t("payment_update_no_changes_detected")}
          </Text>
        )}
      </Flex>
    </form>
  );
};
