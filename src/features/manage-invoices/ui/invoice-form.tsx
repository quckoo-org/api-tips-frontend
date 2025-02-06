"use client";

import {
  Button,
  Flex,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useInvoicesPaymentType } from "@/entities/invoices";
import { useGetOrders } from "@/entities/order";
import { CreateInvoiceFormValuesT } from "@/features/manage-invoices/model/types";
import { fromDecimal } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { Invoice } from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

type InvoiceFormProps = {
  className?: string;
  invoice?: Invoice;
  onSuccess: (invoice: CreateInvoiceFormValuesT) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export const InvoiceForm: FC<InvoiceFormProps> = ({
  className,
  onSuccess,
  invoice,
  isLoading,
  error,
}) => {
  const { t } = useTranslations();
  const { getAllPaymentsOptions } = useInvoicesPaymentType();
  const ordersQuery = useGetOrders({});

  const ordersOptions = ordersQuery.data?.orders.map((order) => ({
    value: order.id.toString(),
    label: order.id.toString(),
  }));

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<CreateInvoiceFormValuesT>({
    defaultValues: {
      ...invoice,
      totalAmount: invoice?.totalAmount
        ? fromDecimal(invoice?.totalAmount)
        : undefined,
    },
  });

  const onSubmit = (data: CreateInvoiceFormValuesT) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        {!!error && <Text color="red">{error}</Text>}
        <Controller
          name="amountOfRequests"
          control={control}
          rules={{ required: t("invoice_amount_of_requests_is_required") }}
          render={({ field }) => (
            <NumberInput
              label={t("invoice_amount_of_requests")}
              withAsterisk
              hideControls
              allowNegative={false}
              allowDecimal={false}
              value={field.value}
              placeholder={t("enter_invoice_amount_of_requests")}
              onChange={field.onChange}
              error={errors.amountOfRequests?.message}
            />
          )}
        />
        <Controller
          name="totalAmount"
          control={control}
          rules={{ required: t("total_amount_is_required") }}
          render={({ field }) => (
            <NumberInput
              label={t("total_amount")}
              withAsterisk
              hideControls
              allowNegative={false}
              decimalScale={2}
              value={field.value}
              placeholder={t("enter_total_amount")}
              onChange={field.onChange}
              error={errors.totalAmount?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="paymentType"
          rules={{ required: t("payment_type_is_required") }}
          render={({ field }) => (
            <Select
              {...field}
              searchable
              withAsterisk
              placeholder={t("select_payment_type")}
              label={t("payment_type")}
              error={errors.paymentType?.message}
              data={getAllPaymentsOptions()}
            />
          )}
        />
        <Controller
          control={control}
          name="orderId"
          rules={{ required: t("order_id_is_required") }}
          render={({ field }) => (
            <Select
              {...field}
              searchable
              withAsterisk
              placeholder={t("select_order_id")}
              label={t("order_id")}
              error={errors.orderId?.message}
              data={ordersOptions}
            />
          )}
        />
        <TextInput
          label={t("invoice_description")}
          placeholder={t("enter_invoice_description")}
          {...register("description")}
          error={errors.description?.message}
        />
        <Button loading={isLoading} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};
