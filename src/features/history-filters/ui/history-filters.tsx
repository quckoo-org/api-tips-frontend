"use client";

import { ComboboxData, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";

type HistoryFiltersProps = {
  className?: string;
  onSubmit: (data: { dates: [Date, Date]; userId: null | string }) => void;
  result: [Date, Date];
  usersData: ComboboxData;
};

export const HistoryFilters: FC<HistoryFiltersProps> = ({
  className,
  onSubmit,
  result,
  usersData,
}) => {
  const { t } = useTranslations();

  const { handleSubmit, watch, control } = useForm<{
    dates: [Date, Date];
    userId: string | null;
  }>({
    defaultValues: { dates: result, userId: null },
  });

  const debouncedSubmit = useDebouncedCallback(
    (data: { dates: [Date, Date]; userId: string | null }) => {
      onSubmit(data);
    },
    300,
  );

  const handleSubmitForm = (data: {
    dates: [Date, Date];
    userId: null | string;
  }) => {
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
        {usersData && (
          <Controller
            control={control}
            name="userId"
            render={({ field }) => (
              <Select
                {...field}
                className="w-64"
                value={field.value}
                searchable
                clearable
                placeholder={t("select_user")}
                label={t("user")}
                data={usersData}
              />
            )}
          />
        )}
      </div>
    </form>
  );
};
