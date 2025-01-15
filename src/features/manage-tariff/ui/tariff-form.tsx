"use client";

import { Button, Flex, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { createDecimal } from "@/shared/lib/decimal/createDecimal";
import { useTranslations } from "@/shared/locale/translations";
import { TariffFormValues } from "../model/types";

type TariffFormProps = {
  className?: string;
  tariffId?: number;
  onSuccess: (tariff: TariffFormValues) => void;
};

export const TariffForm: FC<TariffFormProps> = ({
  className,
  onSuccess,
  tariffId,
}) => {
  const { t } = useTranslations();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TariffFormValues>({
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      name: "",
      freeTipsCount: 0,
      paidTipsCount: 0,
      totalTipsCount: 0,
      tipPrice: createDecimal(),
      totalPrice: createDecimal(),
    },
  });

  const onSubmit = (data: TariffFormValues) => {
    console.log(data);
    console.log(tariffId);
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <Controller
          name="startDate"
          control={control}
          rules={{ required: t("pick_start_date") }}
          render={({ field }) => (
            <DatePickerInput
              label={t("pick_start_date")}
              placeholder={t("pick_start_date")}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          rules={{ required: t("pick_end_date") }}
          render={({ field }) => (
            <DatePickerInput
              label={t("pick_end_date")}
              placeholder={t("pick_end_date")}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <TextInput
          label={t("name")}
          placeholder={t("enter_name")}
          {...register("name", { required: t("name_is_required") })}
          error={errors.name?.message}
        />
        <TextInput
          label={t("free_requests")}
          placeholder={t("enter_free_requests")}
          {...register("freeTipsCount")}
        />
        <TextInput
          label={t("paid_requests")}
          placeholder={t("enter_paid_requests")}
          {...register("paidTipsCount")}
        />
        <TextInput
          label={t("total_requests")}
          placeholder={t("enter_total_requests")}
          {...register("totalTipsCount")}
        />
        <TextInput
          label={t("cost")}
          placeholder={t("enter_cost")}
          {...register("tipPrice")}
        />
        <TextInput
          label={t("total_cost")}
          placeholder={t("enter_total_cost")}
          {...register("totalPrice")}
        />
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
