"use client";

import { TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InvoicesFiltersT } from "@/features/invoices-filters/model/types";
import { useTranslations } from "@/shared/locale/translations";

type OrdersFiltersProps = {
  className?: string;
  onSubmit: (data: InvoicesFiltersT) => void;
  result: InvoicesFiltersT;
};

export const InvoicesFilters: FC<OrdersFiltersProps> = ({
  className,
  onSubmit,
  result,
}) => {
  const { t } = useTranslations();

  const { handleSubmit, watch, control, register } = useForm<InvoicesFiltersT>({
    defaultValues: result,
    // values: filterMapper.toFilters(searchParams) as GetOrdersRequest_Filter,
  });

  const debouncedSubmit = useDebouncedCallback((data: InvoicesFiltersT) => {
    // const filters: GetOrdersRequest_Filter = {
    //   orderStatus: data.orderStatus,
    // };
    // const queryString = filterMapper.toSearchParams(filters);
    // router.push(`?${queryString}`);
    onSubmit(data);
  }, 300);

  const handleSubmitForm = (data: InvoicesFiltersT) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as InvoicesFiltersT;

    debouncedSubmit(filteredData);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const subscription = watch((data) => handleSubmit(handleSubmitForm)(data));
    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [handleSubmit, watch]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={clsx("mb-2", className)}
    >
      <div className="flex gap-4">
        <TextInput
          label={t("email")}
          placeholder={t("enter_email")}
          {...register("email")}
        />
        <Controller
          name="createdDate"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              label={t("invoice_created_date")}
              placeholder={t("enter_invoice_created_date")}
              value={field.value}
              onChange={field.onChange}
              maxDate={new Date()}
              clearable
            />
          )}
        />
        <Controller
          name="paymentDate"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              label={t("invoice_payment_date")}
              placeholder={t("enter_invoice_payment_date")}
              value={field.value}
              onChange={field.onChange}
              maxDate={new Date()}
              clearable
            />
          )}
        />
      </div>
    </form>
  );
};
