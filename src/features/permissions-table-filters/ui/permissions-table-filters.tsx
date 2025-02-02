"use client";

import { TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PermissionsTableFiltersT } from "@/features/permissions-table-filters";
import { createFilterMapper } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";

type PermissionsTableFiltersProps = {
  className?: string;
  onSubmit: (data: PermissionsTableFiltersT) => void;
  result: PermissionsTableFiltersT;
};

export const PermissionsTableFilters: FC<PermissionsTableFiltersProps> = ({
  className,
  onSubmit,
  result,
}) => {
  const searchParams = useSearchParams();
  const { t } = useTranslations();

  const router = useRouter();

  const filterMapper = createFilterMapper();
  const { handleSubmit, register, watch } = useForm<PermissionsTableFiltersT>({
    defaultValues: {
      search: result.search ?? "",
    },
    values: filterMapper.toFilters(searchParams) as PermissionsTableFiltersT,
  });

  const debouncedSubmit = useDebouncedCallback(
    (data: PermissionsTableFiltersT) => {
      const queryString = filterMapper.toSearchParams(data);
      router.push(`?${queryString}`);
      onSubmit(data);
    },
    300,
  );

  // eslint-disable-next-line
  const handleSubmitForm = (data: Partial<PermissionsTableFiltersT>) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as PermissionsTableFiltersT;

    debouncedSubmit(filteredData);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const subscription = watch((data) => handleSubmit(handleSubmitForm)(data));
    return () => subscription.unsubscribe();
  }, [handleSubmit, handleSubmitForm, watch]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={clsx("mr-2", className)}
    >
      <TextInput
        placeholder={t("search_permissions")}
        {...register("search")}
        className="w-full"
      />
    </form>
  );
};
