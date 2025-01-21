"use client";

import { Button, Flex, Text, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useGetOrder } from "@/features/manage-order/model/use-get-order";
import { useTranslations } from "@/shared/locale/translations";
import { OrderFormValues } from "../model/types";

type OrderFormProps = {
  className?: string;
  orderId?: number;
  onSuccess: (order: OrderFormValues) => Promise<void>;
  error?: string;
};

export const OrderForm: FC<OrderFormProps> = ({
  className,
  onSuccess,
  orderId,
  error,
}) => {
  const { t } = useTranslations();
  const orderQuery = useGetOrder({ orderId });

  console.log(orderQuery);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      status: "",
      count: 0,
      tariff: {
        name: "",
      },
      orderNumber: 0,
      firstName: "",
      lastName: "",
      email: "",
      sum: 0,
      currency: "",
    },
    values: {
      status: orderQuery.data?.order?.status ?? "",
      count: orderQuery.data?.order?.count ?? 0,
      tariff: {
        name: orderQuery.data?.order?.tariff.name ?? "",
      },
      orderNumber: orderQuery.data?.order?.orderNumber ?? 0,
      firstName: orderQuery.data?.order?.firstName ?? "",
      lastName: orderQuery.data?.order?.lastName ?? "",
      email: orderQuery.data?.order?.email ?? "",
      sum: orderQuery.data?.order?.sum ?? 0,
      currency: orderQuery.data?.order?.currency ?? "",
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
    console.log(orderId);
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        {!!error && <Text color="red">{error}</Text>}
        <TextInput
          label={t("email")}
          placeholder={t("enter_email")}
          {...register("email", { required: t("email_is_required") })}
          error={errors.email?.message}
        />
        <TextInput
          label={t("first_name")}
          placeholder={t("enter_first_name")}
          {...register("firstName")}
        />
        <TextInput
          label={t("last_name")}
          placeholder={t("enter_last_name")}
          {...register("lastName")}
        />
        <TextInput
          label={t("status")}
          placeholder={t("enter_status")}
          {...register("status")}
        />
        <TextInput
          label={t("count")}
          placeholder={t("enter_count")}
          {...register("count")}
        />
        <TextInput
          label={t("order_number")}
          placeholder={t("enter_order_number")}
          {...register("orderNumber")}
        />
        <TextInput
          label={t("sum")}
          placeholder={t("enter_sum")}
          {...register("sum")}
        />
        <TextInput
          label={t("currency")}
          placeholder={t("enter_currency")}
          {...register("currency")}
        />
        {/*<TextInput*/}
        {/*  label={t("count")}*/}
        {/*  placeholder={t("enter_count")}*/}
        {/*  {...register("count")}*/}
        {/*/>*/}
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
