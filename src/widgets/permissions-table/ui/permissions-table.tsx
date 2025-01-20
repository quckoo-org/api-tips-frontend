"use client";

import { ActionIcon, MenuItem, Pagination, Table } from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC, useState } from "react";

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
import List from "@/shared/ui/list";
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

  const filteredPermissions = permissionsQuery.data?.permissions.filter(
    (permission) => {
      if (filtersResult.search) {
        return permission.name
          .toLowerCase()
          .includes(filtersResult.search.toLowerCase());
      }
      return true;
    },
  );

  const rows = (
    <List
      page={pagination.page}
      pageSize={pagination.pageSize}
      items={filteredPermissions}
      itemToRender={(permission) => (
        <PermissionRow
          key={permission.id}
          permission={permission}
          actions={
            <>
              <MenuItem
                onClick={() => updateModal.updatePermission(permission)}
              >
                {t("update_permission")}
              </MenuItem>
              <MenuItem
                onClick={() => deleteModal.deletePermission(permission)}
              >
                {t("delete_permission")}
              </MenuItem>
            </>
          }
        />
      )}
    />
  );

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
        <div className="flex justify-end mt-4 mb-2 items-center">
          <PermissionsTableFilters
            onSubmit={handleSubmitFilters}
            result={filtersResult}
          />
          <ActionIcon onClick={crateModal.createPermission}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <Table.Th>{t("permission_name")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          disabled={permissionsQuery.isPending}
          value={pagination.page}
          onChange={(page) => {
            pagination.handlePageChange(page, pagination.totalPages);
          }}
          total={pagination.totalPages ?? 0}
        />
      </div>
      {crateModal.modal}
      {updateModal.modal}
      {deleteModal.modal}
    </>
  );
};
