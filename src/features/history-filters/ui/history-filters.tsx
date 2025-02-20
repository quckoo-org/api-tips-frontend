"use client";

import { DatePickerInput } from "@mantine/dates";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";

type HistoryFiltersProps = {
  className?: string;
  onSubmit: (data: { dates: [Date, Date] }) => void;
  result: [Date, Date];
};

export const HistoryFilters: FC<HistoryFiltersProps> = ({
  className,
  onSubmit,
  result,
}) => {
  const { t } = useTranslations();
  const { handleSubmit, watch, control } = useForm<{ dates: [Date, Date] }>({
    defaultValues: { dates: result },
  });

  const debouncedSubmit = useDebouncedCallback(
    (data: { dates: [Date, Date] }) => {
      onSubmit(data);
    },
    300,
  );

  const handleSubmitForm = (data: { dates: [Date, Date] }) => {
    debouncedSubmit(data);
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
      className={clsx("", className)}
    >
      <div className="flex gap-4">
        <Controller
          control={control}
          name="dates"
          render={({ field }) => (
            <DatePickerInput
              type="range"
              value={field.value}
              onChange={field.onChange}
              placeholder={t("all_time")}
              label={t("period")}
            />
          )}
        />
      </div>
    </form>
  );
};
