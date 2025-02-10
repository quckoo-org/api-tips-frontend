"use client";

import { Button, Flex, Select, Text, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";
import { UpdateBalanceRequest } from "@/shared/proto/api_tips_balance/v1/api_tips_balance";
import { BalanceOperationType } from "@/shared/proto/custom_enums/v1/custom_enums";

type UserBalanceFormProps = {
  className?: string;
  userId?: number;
  onSuccess: (user: UpdateBalanceRequest) => Promise<void>;
  error?: string;
};

export const UserBalanceForm: FC<UserBalanceFormProps> = ({
  className,
  onSuccess,
  error,
  userId,
}) => {
  const { t } = useTranslations();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateBalanceRequest>({
    defaultValues: {
      userId,
      freeTipsCount: undefined,
      operationType: BalanceOperationType.BALANCE_OPERATION_TYPE_CREDITING,
      paidTipsCount: undefined,
      reason: "",
    },
  });

  const onSubmit = (data: UpdateBalanceRequest) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        {!!error && <Text color="red">{error}</Text>}
        <Controller
          name="operationType"
          control={control}
          rules={{ required: t("operation_type") }}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              data={[
                {
                  value: BalanceOperationType.BALANCE_OPERATION_TYPE_CREDITING,
                  label: t("crediting"),
                },
                {
                  value: BalanceOperationType.BALANCE_OPERATION_TYPE_DEBITING,
                  label: t("debiting"),
                },
              ]}
            />
          )}
        />
        <TextInput
          label={t("paid_tips_count")}
          placeholder={t("enter_paid_tips_count")}
          {...register("paidTipsCount", {})}
          error={errors.paidTipsCount?.message}
        />
        <TextInput
          label={t("free_tips_count")}
          placeholder={t("enter_free_tips_count")}
          {...register("freeTipsCount", {})}
          error={errors.freeTipsCount?.message}
        />
        <TextInput
          label={t("reason")}
          placeholder={t("enter_reason")}
          {...register("reason")}
          error={errors.reason?.message}
        />
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
