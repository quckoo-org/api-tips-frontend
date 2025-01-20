"use clients";

import { Loader, MultiSelect } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useGetRoles } from "@/entities/role";
import { useTranslations } from "@/shared/locale/translations";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type RoleSelectProps = {
  className?: string;
  onChangeRole: (values: Role[] | undefined) => void;
  value?: Role[];
  error?: string;
};

export const RolesMultiSelect: FC<RoleSelectProps> = ({
  className,
  onChangeRole,
  value,
  error,
}) => {
  const { t } = useTranslations();
  const rolesQuery = useGetRoles();

  const selectedRoles = value?.map((role) => role.id.toString()) ?? [];

  const rolesData =
    rolesQuery.data?.roles.map((role) => ({
      value: role.id.toString(),
      label: role.name,
    })) ?? [];

  const handleChangeRole = (value?: string[]) => {
    if (!value) {
      onChangeRole(undefined);

      return;
    }
    const selectedRoles = rolesQuery.data?.roles.filter((role) =>
      value.includes(role.id.toString()),
    );
    onChangeRole(selectedRoles);
  };

  return (
    <MultiSelect
      disabled={rolesQuery.isLoading}
      rightSection={rolesQuery.isLoading && <Loader size="xs" />}
      label={t("roles")}
      placeholder={t("select_role")}
      className={clsx("", className)}
      value={selectedRoles}
      data={rolesData}
      onChange={handleChangeRole}
      error={error}
    />
  );
};
