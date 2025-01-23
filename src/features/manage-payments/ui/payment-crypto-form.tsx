"use client";

import { Button, Checkbox, Flex, Text, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { CryptoWalletPayment } from "@/entities/payment";
import {
  cryptoCurrencyType,
  CryptoPaymentFormValues,
} from "@/features/manage-payments/model/types";
import { useTranslations } from "@/shared/locale/translations";

type PaymentFormProps = {
  className?: string;
  payment?: CryptoWalletPayment;
  onSuccess: (payment: CryptoPaymentFormValues) => void;
  isLoading?: boolean;
};

export const PaymentCryptoForm: FC<PaymentFormProps> = ({
  className,
  onSuccess,
  payment,
  isLoading,
}) => {
  const { t } = useTranslations();
  const [showUnchangedError, setShowUnchangedError] = useState<boolean>(false);
  const defaultValues: Partial<CryptoPaymentFormValues> = {
    wallet: payment?.wallet,
    address: payment?.address,
    cryptoCurrencyType: cryptoCurrencyType[payment!.cryptoCurrencyType],
    token: payment?.token,
    isBanned: payment?.isBanned,
  };
  const { register, handleSubmit, watch } = useForm<CryptoPaymentFormValues>({
    defaultValues,
  });

  const currentValues = watch();

  const onSubmit = (data: CryptoPaymentFormValues) => {
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
          label={t("crypto_address")}
          placeholder={t("enter_crypto_address")}
          {...register("address")}
        />
        <TextInput
          label={t("crypto_wallet")}
          placeholder={t("enter_crypto_wallet")}
          {...register("wallet")}
        />
        <TextInput
          label={t("crypto_token")}
          placeholder={t("enter_crypto_token")}
          {...register("token")}
        />
        <TextInput
          label={t("crypto_currency_type")}
          placeholder={t("enter_crypto_currency_type")}
          {...register("cryptoCurrencyType")}
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
