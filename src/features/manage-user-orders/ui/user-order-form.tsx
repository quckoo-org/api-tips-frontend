"use client";

import { Button, Flex, Select, Text } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { manageUserOrderDepsContext } from "@/features/manage-user-orders";
import { AddUserOrderFormValuesT } from "@/features/manage-user-orders/model/types";
import { useGetOrder } from "@/features/manage-user-orders/model/use-get-order";
import { useStrictContext } from "@/shared/hooks/useSctrictContext";
import { useTranslations } from "@/shared/locale/translations";
import { AddOrderRequest } from "@/shared/proto/api_tips_order/v1/api_tips_order";

type UserOrderFormProps = {
  className?: string;
  orderId?: number;
  onSuccess: (order: Omit<AddOrderRequest, "userId">) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export const UserOrderForm: FC<UserOrderFormProps> = ({
  className,
  onSuccess,
  orderId,
  isLoading,
  error,
}) => {
  const { t } = useTranslations();
  const orderQuery = useGetOrder({ orderId });
  const { getTariffs } = useStrictContext(manageUserOrderDepsContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddUserOrderFormValuesT>({
    defaultValues: {
      tariffId: undefined,
    },
    values: {
      tariffId: orderQuery.data?.order?.tariff?.id.toString(),
    },
  });

  const onSubmit = (data: AddUserOrderFormValuesT) => {
    const result: Omit<AddOrderRequest, "userId"> = {
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
          Submit
        </Button>
      </Flex>
    </form>
  );
};
