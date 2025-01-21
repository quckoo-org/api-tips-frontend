"use client";

import { ActionIcon, MenuItem, Pagination, Table } from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC } from "react";
import { RoleRow, useGetRoles } from "@/entities/role";

import {
  useCreateRoleModal,
  useDeleteRoleModal,
  useUpdateRoleModal,
} from "@/features/manage-roles";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslations } from "@/shared/locale/translations";
import List from "@/shared/ui/list";
import { RolesTableSkeleton } from "./roles-table-skeleton";

type RolePageProps = {
  className?: string;
};

export const RolesTable: FC<RolePageProps> = ({ className }) => {
  const crateModal = useCreateRoleModal();
  const updateModal = useUpdateRoleModal();
  const deleteModal = useDeleteRoleModal();
  const { t } = useTranslations();

  const rolesQuery = useGetRoles();
  const pagination = usePagination(rolesQuery.data?.roles.length);

  const rows = (
    <List
      page={pagination.page}
      pageSize={pagination.pageSize}
      items={rolesQuery.data?.roles}
      itemToRender={(role) => (
        <RoleRow
          key={role.id}
          role={role}
          actions={
            <>
              <MenuItem onClick={() => updateModal.updateRole(role)}>
                {t("update_role")}
              </MenuItem>
              <MenuItem onClick={() => deleteModal.deleteRole(role)}>
                {t("delete_role")}
              </MenuItem>
            </>
          }
        />
      )}
    />
  );

  if (rolesQuery.isLoading) {
    return <RolesTableSkeleton className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex justify-end mt-4 mb-2">
          <ActionIcon onClick={crateModal.createRole}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <Table.Th>{t("role_name")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          disabled={rolesQuery.isPending}
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
