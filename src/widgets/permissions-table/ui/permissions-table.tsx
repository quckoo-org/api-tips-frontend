"use client";

import {
  ActionIcon,
  Button,
  MenuItem,
  Pagination,
  Table,
  Title,
} from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo, useState } from "react";

import { PermissionRow, useGetPermissions } from "@/entities/permissions";
import {
  useCreatePermissionModal,
  useDeletePermissionModal,
  useUpdatePermissionModal,
} from "@/features/manage-permissions";
import { MethodsTableFiltersT } from "@/features/methods-table-filters";
import { PermissionsTableFilters } from "@/features/permissions-table-filters";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslations } from "@/shared/locale/translations";
import {
  Permission,
  Role,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";
import List from "@/shared/ui/list";
import { useReactTable } from "@/shared/ui/use-react-table";
import { PermissionsTableSkeleton } from "./permissions-table-skeleton";

type PermissionPageProps = {
  className?: string;
};

export const PermissionsTable: FC<PermissionPageProps> = ({ className }) => {
  const crateModal = useCreatePermissionModal();
  const updateModal = useUpdatePermissionModal();
  const deleteModal = useDeletePermissionModal();
  const { t } = useTranslations();
  const [filtersResult, setFiltersResult] = useState<MethodsTableFiltersT>({
    search: "",
  });
  const permissionsQuery = useGetPermissions();
  const pagination = usePagination(permissionsQuery.data?.permissions.length);

  const filteredPermissions = useMemo(
    () =>
      permissionsQuery.data?.permissions.filter((permission) => {
        if (filtersResult.search) {
          return permission.name
            .toLowerCase()
            .includes(filtersResult.search.toLowerCase());
        }
        return true;
      }),
    [permissionsQuery.data, filtersResult.search],
  );

  const columns = useMemo<MRT_ColumnDef<Permission>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("name"),
        sortingFn: "alphanumeric",
        grow: 1,
      },
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: filteredPermissions ?? [],
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: t("actions"),
        size: 20,
      },
    },
    renderRowActions: ({ cell }) => (
      <div className="flex gap-x-4">
        <Button
          onClick={() => updateModal.updatePermission(cell.row.original)}
          color="gray"
          variant="outline"
          size="xs"
        >
          {t("update")}
        </Button>
        <Button
          onClick={() => deleteModal.deletePermission(cell.row.original)}
          color="gray"
          variant="outline"
          size="xs"
        >
          {t("delete")}
        </Button>
      </div>
    ),
    state: {
      isLoading: permissionsQuery.isLoading,
    },
    defaultColumn: {
      maxSize: 200,
      size: 140,
    },
  });

  const handleSubmitFilters = (data: MethodsTableFiltersT) => {
    pagination.handlePageChange(1, pagination.pageSize);
    setFiltersResult(data);
  };

  if (permissionsQuery.isLoading) {
    return <PermissionsTableSkeleton className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <Title size="h1" className="mb-6">
          {t("permissions")}
        </Title>
        <div className="flex mb-6 items-center">
          <PermissionsTableFilters
            onSubmit={handleSubmitFilters}
            result={filtersResult}
            className="grow"
          />
          <Button
            size="sm"
            className="w-fit"
            onClick={crateModal.createPermission}
          >
            {t("create_permission")}
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
