"use client";

import { Loader, Select, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { createFilterMapper } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";

type UserRegistryFiltersProps = {
  className?: string;
  onSubmit: () => void;
  isPending: boolean;
};

type UserRegistryFiltersStateT = {
  email: string | undefined;
  isBlocked: boolean | null;
  isDeleted: boolean | null;
  isVerified: boolean | null;
};

const defaultValues = {
  isBlocked: null,
  isDeleted: false,
  isVerified: null,
  email: undefined,
};

export const UserRegistryFilters: FC<UserRegistryFiltersProps> = ({
  className,
  onSubmit,
  isPending,
}) => {
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const router = useRouter();
  const filterMapper = createFilterMapper();

  const filtersFromParams = useMemo(() => {
    return filterMapper.toFilters(searchParams) as UserRegistryFiltersStateT;
  }, [searchParams]);

  const { handleSubmit, register, watch, control, reset } =
    useForm<UserRegistryFiltersStateT>({
      defaultValues,
    });

  useEffect(() => {
    reset(filtersFromParams);
    onSubmit();

    if (!searchParams.size) {
      const queryString = filterMapper.toSearchParams(defaultValues);
      router.push(`?${queryString}`);
    }
  }, []);

  const debouncedSubmit = useDebouncedCallback(
    (data: UserRegistryFiltersStateT) => {
      const queryString = filterMapper.toSearchParams(data);
      router.push(`?${queryString}`);
      onSubmit();
    },
    300,
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const subscription = watch((data) => handleSubmit(debouncedSubmit)(data));
    return () => subscription.unsubscribe();
  }, [handleSubmit, debouncedSubmit, watch]);

  const booleanOptions = [
    { value: "true", label: t("show") },
    { value: "false", label: t("hide") },
  ];

  const FIELDS = [
    { label: t("is_blocked"), field: "isBlocked" },
    { label: t("is_verified"), field: "isVerified" },
    { label: t("is_hidden"), field: "isDeleted" },
  ] as const;

  return (
    <form
      onSubmit={handleSubmit(debouncedSubmit)}
      className={clsx("flex gap-4 items-start", className)}
    >
      <TextInput
        label={t("search")}
        rightSection={isPending ? <Loader size="xs" /> : null}
        placeholder={t("search")}
        {...register("email")}
      />
      {FIELDS.map((field) => (
        <Controller
          key={field.field}
          control={control}
          name={field.field}
          render={({ field: { value, onChange, ...rest } }) => (
            <Select
              {...rest}
              clearable
              value={value === true ? "true" : value === false ? "false" : null}
              onChange={(val) =>
                onChange(val === "true" ? true : val === "false" ? false : null)
              }
              placeholder={t(field.label)}
              label={t(field.label)}
              data={booleanOptions}
            />
          )}
        />
      ))}
    </form>
  );
};
