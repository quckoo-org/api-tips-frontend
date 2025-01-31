"use client";

import { Flex, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MethodsTableFiltersT } from "@/features/methods-table-filters";
import { createFilterMapper } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";

type MethodTableFiltersProps = {
  className?: string;
  onSubmit: (data: MethodsTableFiltersT) => void;
  result: MethodsTableFiltersT;
};

export const MethodTableFilters: FC<MethodTableFiltersProps> = ({
  className,
  onSubmit,
  result,
}) => {
  const searchParams = useSearchParams();
  const { t } = useTranslations();

  const router = useRouter();

  const filterMapper = createFilterMapper();
  const { handleSubmit, register, watch } = useForm<MethodsTableFiltersT>({
    defaultValues: {
      search: result.search ?? "",
    },
    values: filterMapper.toFilters(searchParams) as MethodsTableFiltersT,
  });

  const debouncedSubmit = useDebouncedCallback((data: MethodsTableFiltersT) => {
    const queryString = filterMapper.toSearchParams(data);
    router.push(`?${queryString}`);
    onSubmit(data);
  }, 300);

  // eslint-disable-next-line
  const handleSubmitForm = (data: Partial<MethodsTableFiltersT>) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as MethodsTableFiltersT;

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
      <TextInput placeholder={t("search_method")} {...register("search")} />
    </form>
  );
};
