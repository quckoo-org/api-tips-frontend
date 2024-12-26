"use clients";

import {  MultiSelect } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";

type RoleSelectProps = {
  className?: string;
  onChangeRole: (values: string[] | null) => void;
  value?: string[];
};

export const RolesMultiSelect: FC<RoleSelectProps> = ({
  className,
  onChangeRole,
  value,
}) => {
  const { t } = useTranslations();
  //const rolesQuery = useGetRoles();

  const handleChangeRole = (value?: string[]) => {
    if (!value) {
      onChangeRole(null);

      return;
    }
    onChangeRole(value);
  };

  return (
    <MultiSelect
      //disabled={rolesQuery.isLoading}
      //rightSection={rolesQuery.isLoading && <Loader size="xs" />}
      label={t("role")}
      placeholder={t("select_role")}
      className={clsx("", className)}
      value={value}
      //data={rolesQuery.data ?? []}
      onChange={handleChangeRole}
    />
  );
};
