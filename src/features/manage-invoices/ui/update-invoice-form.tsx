"use client";

import { Button, Flex, NumberInput, Text, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { UpdateInvoiceFormValuesT } from "@/features/manage-invoices/model/types";
import { useTranslations } from "@/shared/locale/translations";
import { Invoice } from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

type InvoiceFormProps = {
  className?: string;
  invoice?: Invoice;
  onSuccess: (invoice: UpdateInvoiceFormValuesT) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export const UpdateInvoiceForm: FC<InvoiceFormProps> = ({
  className,
  onSuccess,
  invoice,
  isLoading,
  error,
}) => {
  const { t } = useTranslations();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<UpdateInvoiceFormValuesT>({
    defaultValues: {
      ...invoice,
    },
  });

  const onSubmit = (data: UpdateInvoiceFormValuesT) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        {!!error && <Text color="red">{error}</Text>}
        <TextInput
          label={t("invoice_ref_number")}
          placeholder={t("enter_invoice_ref_number")}
          {...register("refNumber", {
            required: t("invoice_ref_number_is_required"),
          })}
          error={errors.refNumber?.message}
        />
        <Controller
          name="amountOfRequests"
          control={control}
          rules={{ required: t("invoice_amount_of_requests_is_required") }}
          render={({ field }) => (
            <NumberInput
              label={t("invoice_amount_of_requests")}
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

        <Button loading={isLoading} type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};
