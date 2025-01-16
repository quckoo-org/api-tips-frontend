"use client";

import {
  Button,
  Checkbox,
  Flex,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { clsx } from "clsx";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { fromDecimal } from "@/shared/lib";
import { dayjs } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { TariffFormValues } from "../model/types";

type TariffFormProps = {
  className?: string;
  tariff?: Tariff;
  onSuccess: (tariff: TariffFormValues) => void;
  isLoading?: boolean;
};

export const TariffForm: FC<TariffFormProps> = ({
  className,
  onSuccess,
  tariff,
  isLoading,
}) => {
  const { t } = useTranslations();
  const [showUnchangedError, setShowUnchangedError] = useState<boolean>(false);
  const defaultValues: Partial<TariffFormValues> = {
    startDate: tariff?.startDate,
    endDate: tariff?.endDate,
    name: tariff?.name,
    freeTipsCount: tariff?.freeTipsCount,
    paidTipsCount: tariff?.paidTipsCount,
    totalTipsCount: tariff?.totalTipsCount,
    // tipPrice: fromDecimal(tariff?.tipPrice) || undefined,
    totalPrice: fromDecimal(tariff?.totalPrice) || undefined,
    isHidden: !!tariff?.hiddenAt,
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TariffFormValues>({
    defaultValues,
  });

  const currentValues = watch();

  const onSubmit = (data: TariffFormValues) => {
    const isUnchanged =
      JSON.stringify(currentValues) === JSON.stringify(defaultValues);
    if (isUnchanged) {
      setShowUnchangedError(true);
      return;
    }
    setShowUnchangedError(false);
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
                !currentValues.endDate ||
                dayjs(value).isBefore(dayjs(currentValues.endDate), "day") ||
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
                !currentValues.startDate ||
                dayjs(value).isAfter(dayjs(currentValues.startDate), "day") ||
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
              allowDecimal={false}
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
              allowDecimal={false}
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
              allowDecimal={false}
            />
          )}
        />
        <Checkbox label="Is Hidden" {...register("isHidden")} />
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
        {showUnchangedError && (
          <Text className="text-center text-sm text-red-600">
            No changes detected. Please modify at least one field to submit.
          </Text>
        )}
      </Flex>
    </form>
  );
};
