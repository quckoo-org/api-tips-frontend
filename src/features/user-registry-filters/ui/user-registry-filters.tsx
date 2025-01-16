"use client";

import {
  ActionIcon,
  Collapse,
  Flex,
  Loader,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { ListFilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { createFilterMapper } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { GetUsersRequest_Filter } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type UserRegistryFiltersProps = {
  className?: string;
  onSubmit: (data: GetUsersRequest_Filter) => void;
  isPending: boolean;
  result: GetUsersRequest_Filter;
};

export const UserRegistryFilters: FC<UserRegistryFiltersProps> = ({
  className,
  onSubmit,
  isPending,
  result,
}) => {
  const [opened, handlers] = useDisclosure();
  const searchParams = useSearchParams();
  const { t } = useTranslations();

  const router = useRouter();

  const filterMapper = createFilterMapper();
  const { handleSubmit, register, watch, control } =
    useForm<GetUsersRequest_Filter>({
      defaultValues: {
        isBlocked: undefined,
        isDeleted: result.isDeleted ?? undefined,
        isVerified: undefined,
        email: "",
      },
      values: filterMapper.toFilters(searchParams) as GetUsersRequest_Filter,
    });

  const debouncedSubmit = useDebouncedCallback(
    (data: GetUsersRequest_Filter) => {
      const filters = {
        ...data,
        isVerified: data.isVerified ?? undefined,
        isBlocked: data.isBlocked ?? undefined,
        isDeleted: data.isDeleted ?? undefined,
      };

      const queryString = filterMapper.toSearchParams(filters);
      router.push(`?${queryString}`);
      onSubmit(data);
    },
    300,
  );

  // eslint-disable-next-line
  const handleSubmitForm = (data: Partial<GetUsersRequest_Filter>) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as unknown as GetUsersRequest_Filter;

    debouncedSubmit(filteredData);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const subscription = watch((data) => handleSubmit(handleSubmitForm)(data));
    return () => subscription.unsubscribe();
  }, [handleSubmit, handleSubmitForm, watch]);

  const handleMapToFilters = (value: string | null) => {
    return value === "true" ? true : value === "false" ? false : null;
  };

  const handleMapToSelectValue = (value: boolean | undefined) => {
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
          <TextInput
            rightSection={isPending ? <Loader size="xs" /> : null}
            placeholder={t("search")}
            {...register("email")}
            className="mb-4"
          />
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
          <Controller
            control={control}
            name="isBlocked"
            render={({ field }) => (
              <Select
                {...field}
                value={handleMapToSelectValue(field.value)}
                onChange={(value) => field.onChange(handleMapToFilters(value))}
                placeholder={t("is_blocked")}
                label={t("is_blocked")}
                data={[
                  { value: "null", label: t("all") },
                  { value: "true", label: t("show_blocked") },
                  { value: "false", label: t("hide_blocked") },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="isVerified"
            render={({ field }) => (
              <Select
                {...field}
                value={handleMapToSelectValue(field.value)}
                onChange={(value) => field.onChange(handleMapToFilters(value))}
                placeholder={t("is_verified")}
                label={t("is_verified")}
                data={[
                  { value: "null", label: t("all") },
                  { value: "true", label: t("show_verified") },
                  { value: "false", label: t("hide_verified") },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="isDeleted"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  value={handleMapToSelectValue(field.value)}
                  onChange={(value) =>
                    field.onChange(handleMapToFilters(value))
                  }
                  placeholder={t("is_hidden")}
                  label={t("is_hidden")}
                  data={[
                    { value: "null", label: t("all") },
                    { value: "true", label: t("show_hidden") },
                    { value: "false", label: t("hide_hidden") },
                  ]}
                />
              );
            }}
          />
        </div>
      </Collapse>
    </form>
  );
};
