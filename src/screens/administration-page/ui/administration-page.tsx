"use client";
import { Tabs } from "@mantine/core";
import React, { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { MethodsTable } from "@/widgets/methods-table/ui/methods-table";
import { PermissionsTable } from "@/widgets/permissions-table/ui/permissions-table";
import { RolesTable } from "@/widgets/roles-table/ui/roles-table";

export const AdministrationPage: FC = () => {
  const { t } = useTranslations();
  return (
    <Tabs defaultValue="roles">
      <Tabs.List>
        <Tabs.Tab value="roles">{t("roles_tab")}</Tabs.Tab>
        <Tabs.Tab value="permissions">{t("permissions_tab")}</Tabs.Tab>
        <Tabs.Tab value="methods">{t("methods_tab")}</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="roles">
        <RolesTable />
      </Tabs.Panel>
      <Tabs.Panel value="permissions">
        <PermissionsTable />
      </Tabs.Panel>
      <Tabs.Panel value="methods">
        <MethodsTable />
      </Tabs.Panel>
    </Tabs>
  );
};
