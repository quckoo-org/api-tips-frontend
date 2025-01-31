"use client";

import { Button, Title } from "@mantine/core";
import clsx from "clsx";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo } from "react";
import { useGetRoles } from "@/entities/role";

import {
  useCreateRoleModal,
  useDeleteRoleModal,
  useUpdateRoleModal,
} from "@/features/manage-roles";
import { useTranslations } from "@/shared/locale/translations";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { useReactTable } from "@/shared/ui/use-react-table";

type RolePageProps = {
  className?: string;
};

export const RolesTable: FC<RolePageProps> = ({ className }) => {
  const crateModal = useCreateRoleModal();
  const updateModal = useUpdateRoleModal();
  const deleteModal = useDeleteRoleModal();
  const { t } = useTranslations();

  const rolesQuery = useGetRoles();

  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("name"),
        sortingFn: "alphanumeric",
        size: undefined, // Убираем фиксированный размер
        grow: 1, // Даем колонке возможность растягиваться
      },
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: rolesQuery.data?.roles ?? [],
    enableRowActions: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: t("actions"),
        size: 80, // Фиксируем ширину колонки
        maxSize: 80,
        enableResizing: false, // Запрещаем растяжение
        mantineTableHeadCellProps: { style: { flex: "none", width: "80px" } }, // Принудительно фиксируем
        mantineTableBodyCellProps: { style: { flex: "none", width: "80px" } },
      },
    },
    renderRowActions: ({ cell }) => (
      <div className="flex w-fit gap-x-4">
        <Button
          onClick={() => updateModal.updateRole(cell.row.original)}
          color="gray"
          variant="outline"
          size="xs"
        >
          {t("update")}
        </Button>
        <Button
          onClick={() => deleteModal.deleteRole(cell.row.original)}
          color="gray"
          variant="outline"
          size="xs"
        >
          {t("delete")}
        </Button>
      </div>
    ),
    state: {
      isLoading: rolesQuery.isLoading,
    },
    defaultColumn: {
      // maxSize: 200,
      // size: 140,
    },
  });

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex justify-between mb-6">
          <Title size="h1">{t("roles")}</Title>
          <Button size="sm" onClick={crateModal.createRole}>
            {t("create_role")}
          </Button>
        </div>
        <MantineReactTable table={table} />
      </div>
      {crateModal.modal}
      {updateModal.modal}
      {deleteModal.modal}
    </>
  );
};
