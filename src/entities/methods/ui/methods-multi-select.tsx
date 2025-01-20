"use clients";

import { Loader, MultiSelect } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useGetMethods } from "@/entities/methods/model/use-get-methods";
import { useTranslations } from "@/shared/locale/translations";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type MethodsSelectProps = {
  className?: string;
  onChangeMethod: (values: Method[] | undefined) => void;
  value?: Method[];
  error?: string;
};

export const MethodsMultiSelect: FC<MethodsSelectProps> = ({
  className,
  onChangeMethod,
  value,
  error,
}) => {
  const { t } = useTranslations();
  const methodsQuery = useGetMethods();

  const selectedMethods = value?.map((method) => method.id.toString()) ?? [];

  const methodMultiSelectData = methodsQuery.data?.methods.map((method) => ({
    value: method.id.toString(),
    label: method.name,
  }));

  const handleChangeMethod = (value?: string[]) => {
    if (!value) {
      onChangeMethod(undefined);

      return;
    }
    const selectedMethods = methodsQuery.data?.methods.filter((method) =>
      value.includes(method.id.toString()),
    );
    onChangeMethod(selectedMethods);
  };

  return (
    <MultiSelect
      disabled={methodsQuery.isLoading}
      rightSection={methodsQuery.isLoading && <Loader size="xs" />}
      label={t("method")}
      placeholder={t("select_method")}
      className={clsx("", className)}
      value={selectedMethods}
      data={methodMultiSelectData ?? []}
      onChange={handleChangeMethod}
      clearable
      searchable
      error={error}
    />
  );
};
