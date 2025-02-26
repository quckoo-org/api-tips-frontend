"use client";

import { Button, Flex, Select, Text, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { balanceDepsContext } from "@/features/balance";
import { useStrictContext } from "@/shared/hooks/useSctrictContext";
import { useTranslations } from "@/shared/locale/translations";
import { UpdateBalanceRequest } from "@/shared/proto/api_tips_balance/v1/api_tips_balance";
import { BalanceOperationType } from "@/shared/proto/custom_enums/v1/custom_enums";

type UserBalanceFormProps = {
  className?: string;
  onSuccess: (user: UpdateBalanceRequest) => Promise<void>;
  error?: string;
  isLoading?: boolean;
};

export const UserBalanceForm: FC<UserBalanceFormProps> = ({
  className,
  onSuccess,
  isLoading,
  error,
}) => {
  const { t } = useTranslations();
  const { getUsers } = useStrictContext(balanceDepsContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateBalanceRequest>({
    defaultValues: {
      userId: undefined,
      creditedFreeTipsCount: undefined,
      debitedTipsCount: undefined,
      operationType: BalanceOperationType.BALANCE_OPERATION_TYPE_CREDITING,
      creditedPaidTipsCount: undefined,
      reason: "",
    },
  });

  const operationTypeWatch = watch("operationType");

  const onSubmit = (data: UpdateBalanceRequest) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        {!!error && <Text color="red">{error}</Text>}
        <Controller
          control={control}
          name="userId"
          rules={{ required: t("required_field") }}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value?.toString()}
              searchable
              placeholder={t("select_user")}
              label={t("user")}
              error={errors.userId?.message}
              data={getUsers()}
            />
          )}
        />
        <Controller
          name="operationType"
          control={control}
          rules={{ required: t("require_filed") }}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={(value) => {
                setValue("creditedFreeTipsCount", undefined);
                setValue("creditedPaidTipsCount", undefined);
                setValue("debitedTipsCount", undefined);
                field.onChange(value);
              }}
              label={t("operation_type")}
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
        {operationTypeWatch ===
          BalanceOperationType.BALANCE_OPERATION_TYPE_CREDITING && (
          <>
            <TextInput
              label={t("paid_tips_count")}
              placeholder={t("enter_paid_tips_count")}
              {...register("creditedPaidTipsCount", {})}
              error={errors.creditedPaidTipsCount?.message}
            />
            <TextInput
              label={t("free_tips_count")}
              placeholder={t("enter_free_tips_count")}
              {...register("creditedFreeTipsCount", {})}
              error={errors.creditedFreeTipsCount?.message}
            />
          </>
        )}
        {operationTypeWatch ===
          BalanceOperationType.BALANCE_OPERATION_TYPE_DEBITING && (
          <TextInput
            label={t("debited_tips_count")}
            placeholder={t("enter_debited_tips_count")}
            {...register("debitedTipsCount", {})}
            error={errors.debitedTipsCount?.message}
          />
        )}
        <TextInput
          label={t("reason")}
          placeholder={t("enter_reason")}
          {...register("reason")}
          error={errors.reason?.message}
        />
        <Button loading={isLoading} disabled={isLoading} type="submit">
          {t("submit")}
        </Button>
      </Flex>
    </form>
  );
};
