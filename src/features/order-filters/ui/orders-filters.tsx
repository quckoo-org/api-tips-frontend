"use client";

import { ActionIcon, Collapse, Flex, Loader, Title } from "@mantine/core";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { ListFilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createFilterMapper } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { OrdersFiltersT } from "../model/types";

type OrdersFiltersProps = {
  className?: string;
  onSubmit: (data: OrdersFiltersT) => void;
  isPending: boolean;
  result: OrdersFiltersT;
};

export const OrdersFilters: FC<OrdersFiltersProps> = ({
  className,
  onSubmit,
  isPending,
  // result,
}) => {
  const [opened, handlers] = useDisclosure();
  const searchParams = useSearchParams();
  const { t } = useTranslations();

  const router = useRouter();

  const filterMapper = createFilterMapper();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { handleSubmit, register, watch, control } = useForm<OrdersFiltersT>({
    defaultValues: undefined,
    values: filterMapper.toFilters(searchParams) as OrdersFiltersT,
  });

  const debouncedSubmit = useDebouncedCallback((data: OrdersFiltersT) => {
    // const filters = {
    //   ...data,
    //   isVerified: data.isVerified ?? undefined,
    //   isBlocked: data.isBlocked ?? undefined,
    //   isDeleted: data.isDeleted ?? undefined,
    // };
    const filters = {};

    const queryString = filterMapper.toSearchParams(filters);
    router.push(`?${queryString}`);
    onSubmit(data);
  }, 300);

  const handleSubmitForm = (data: OrdersFiltersT) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as OrdersFiltersT;

    debouncedSubmit(filteredData);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const subscription = watch((data) => handleSubmit(handleSubmitForm)(data));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMapToFilters = (value: string | null) => {
    return value === "true" ? true : value === "false" ? false : null;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMapToSelectValue = (value: boolean | null) => {
    return value === true ? "true" : value === false ? "false" : "null";
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={clsx("mb-2", className)}
    >
      <Flex>
        <Title order={3} className="font-normal">
          {t("user_registry")}
        </Title>
        <div className="flex ml-auto gap-x-4">
          <ActionIcon size="lg" onClick={handlers.toggle}>
            {isPending ? (
              <Loader color="white" size="sm" />
            ) : (
              <ListFilterIcon />
            )}
          </ActionIcon>
        </div>
      </Flex>
      <Collapse in={opened}>
        <div className="flex gap-4">
          FILTERS
          {/*  <Controller*/}
          {/*    control={control}*/}
          {/*    name="isBlocked"*/}
          {/*    render={({ field }) => (*/}
          {/*      <Select*/}
          {/*        {...field}*/}
          {/*        value={handleMapToSelectValue(field.value)}*/}
          {/*        onChange={(value) => field.onChange(handleMapToFilters(value))}*/}
          {/*        placeholder={t("is_blocked")}*/}
          {/*        label={t("is_blocked")}*/}
          {/*        data={[*/}
          {/*          { value: "null", label: t("all") },*/}
          {/*          { value: "true", label: t("show_blocked") },*/}
          {/*          { value: "false", label: t("hide_blocked") },*/}
          {/*        ]}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*  <Controller*/}
          {/*    control={control}*/}
          {/*    name="isVerified"*/}
          {/*    render={({ field }) => (*/}
          {/*      <Select*/}
          {/*        {...field}*/}
          {/*        value={handleMapToSelectValue(field.value)}*/}
          {/*        onChange={(value) => field.onChange(handleMapToFilters(value))}*/}
          {/*        placeholder={t("is_verified")}*/}
          {/*        label={t("is_verified")}*/}
          {/*        data={[*/}
          {/*          { value: "null", label: t("all") },*/}
          {/*          { value: "true", label: t("show_verified") },*/}
          {/*          { value: "false", label: t("hide_verified") },*/}
          {/*        ]}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*  <Controller*/}
          {/*    control={control}*/}
          {/*    name="isDeleted"*/}
          {/*    render={({ field }) => {*/}
          {/*      return (*/}
          {/*        <Select*/}
          {/*          {...field}*/}
          {/*          value={handleMapToSelectValue(field.value)}*/}
          {/*          onChange={(value) =>*/}
          {/*            field.onChange(handleMapToFilters(value))*/}
          {/*          }*/}
          {/*          placeholder={t("is_hidden")}*/}
          {/*          label={t("is_hidden")}*/}
          {/*          data={[*/}
          {/*            { value: "null", label: t("all") },*/}
          {/*            { value: "true", label: t("show_hidden") },*/}
          {/*            { value: "false", label: t("hide_hidden") },*/}
          {/*          ]}*/}
          {/*        />*/}
          {/*      );*/}
          {/*    }}*/}
          {/*  />*/}
        </div>
      </Collapse>
    </form>
  );
};
