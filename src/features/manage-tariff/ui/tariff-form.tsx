"use client";

import { Button, Checkbox, Flex, NumberInput, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "@/shared/lib/dayjs-in";
import { fromDecimal } from "@/shared/lib/decimal";
import { useTranslations } from "@/shared/locale/translations";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { TariffFormValues } from "../model/types";

type TariffFormProps = {
  className?: string;
  tariff?: Tariff;
  onSuccess: (tariff: TariffFormValues) => void;
};

export const TariffForm: FC<TariffFormProps> = ({
  className,
  onSuccess,
  tariff,
}) => {
  const { t } = useTranslations();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TariffFormValues>({
    defaultValues: {
      startDate: tariff?.startDate,
      endDate: tariff?.endDate,
      name: tariff?.name,
      freeTipsCount: tariff?.freeTipsCount,
      paidTipsCount: tariff?.paidTipsCount,
      totalTipsCount: tariff?.totalTipsCount,
      // tipPrice: fromDecimal(tariff?.tipPrice) || undefined,
      totalPrice: fromDecimal(tariff?.totalPrice) || undefined,
      isHidden: !!tariff?.hiddenAt,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = (data: TariffFormValues) => {
    console.log(data);
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <TextInput
          label={t("name")}
          placeholder={t("enter_name")}
          withAsterisk
          {...register("name", { required: t("name_is_required") })}
          error={errors.name?.message}
        />
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: t("pick_start_date_required"),
            validate: {
              validInterval: (value) =>
                !endDate ||
                dayjs(value).isBefore(dayjs(endDate), "day") ||
                "Start date must be before end date",
            },
          }}
          render={({ field }) => (
            <DatePickerInput
              withAsterisk
              type={"default"}
              label={t("start_date")}
              placeholder={t("pick_start_date")}
              value={field.value}
              onChange={field.onChange}
              error={errors.startDate?.message}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          rules={{
            validate: {
              afterStart: (value) =>
                !value ||
                !startDate ||
                dayjs(value).isAfter(dayjs(startDate), "day") ||
                "End date must be after start date",
            },
          }}
          render={({ field }) => (
            <DatePickerInput
              label={t("pick_end_date")}
              placeholder={t("pick_end_date")}
              value={field.value}
              onChange={field.onChange}
              clearable
            />
          )}
        />
        <Controller
          name="totalPrice"
          control={control}
          rules={{ required: t("total_price_is_required") }}
          render={({ field }) => (
            <NumberInput
              label={t("total_price")}
              withAsterisk
              hideControls
              allowNegative={false}
              decimalScale={2}
              value={field.value}
              placeholder={t("enter_total_price")}
              onChange={field.onChange}
              error={errors.totalPrice?.message}
            />
          )}
        />
        <Controller
          name="freeTipsCount"
          control={control}
          render={({ field }) => (
            <NumberInput
              label={t("free_requests")}
              hideControls
              allowNegative={false}
              value={field.value}
              placeholder={t("enter_free_requests")}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="paidTipsCount"
          control={control}
          render={({ field }) => (
            <NumberInput
              label={t("paid_requests")}
              hideControls
              allowNegative={false}
              value={field.value as number}
              placeholder={t("enter_paid_requests")}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="totalTipsCount"
          control={control}
          render={({ field }) => (
            <NumberInput
              label={t("total_requests")}
              hideControls
              allowNegative={false}
              value={field.value}
              placeholder={t("enter_total_requests")}
              onChange={field.onChange}
            />
          )}
        />
        <Checkbox label="Is Hidden" {...register("isHidden")} />
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
