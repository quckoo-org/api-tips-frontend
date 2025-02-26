"use client";

import { Button, Flex, Select, Text } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { menageOrderDepsContext } from "@/features/manage-order";
import { AddOrderFormValuesT } from "@/features/manage-order/model/types";
import { useGetOrder } from "@/features/manage-order/model/use-get-order";
import { useStrictContext } from "@/shared/hooks/useSctrictContext";
import { useTranslations } from "@/shared/locale/translations";
import { AddOrderRequest } from "@/shared/proto/api_tips_order/v1/api_tips_order";

type OrderFormProps = {
  className?: string;
  orderId?: number;
  onSuccess: (order: AddOrderRequest) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export const OrderForm: FC<OrderFormProps> = ({
  className,
  onSuccess,
  orderId,
  isLoading,
  error,
}) => {
  const { t } = useTranslations();
  const orderQuery = useGetOrder({ orderId });
  const { getTariffs, getUsers } = useStrictContext(menageOrderDepsContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddOrderFormValuesT>({
    defaultValues: {
      userId: undefined,
      tariffId: undefined,
    },
    values: {
      userId: orderQuery.data?.order?.user?.id.toString(),
      tariffId: orderQuery.data?.order?.tariff?.id.toString(),
    },
  });

  const onSubmit = (data: AddOrderFormValuesT) => {
    const result: AddOrderRequest = {
      userId: Number(data.userId)!,
      tariffId: Number(data.tariffId)!,
    };
    onSuccess(result);
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
              searchable
              placeholder={t("select_order")}
              label={t("order")}
              error={errors.userId?.message}
              data={getUsers()}
            />
          )}
        />
        <Controller
          control={control}
          name="tariffId"
          rules={{ required: t("required_field") }}
          render={({ field }) => (
            <Select
              {...field}
              searchable
              placeholder={t("select_tariff")}
              label={t("tariff")}
              error={errors.tariffId?.message}
              data={getTariffs()}
            />
          )}
        />
        <Button loading={isLoading} type="submit">
          {t("submit")}
        </Button>
      </Flex>
    </form>
  );
};
