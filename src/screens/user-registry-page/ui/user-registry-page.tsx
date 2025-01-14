"use client";

import { ActionIcon, MenuItem, Pagination, Table } from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC, useState } from "react";
import { useGetUsers, UserRow } from "@/entities/user";
import {
  BlockUserButton,
  HideUserButton,
  useCreateUserModal,
  useUpdateUserModal,
  VerifyUserButton,
} from "@/features/manage-user";
import { UserRegistryFilters } from "@/features/user-registry-filters";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslations } from "@/shared/locale/translations";
import { GetUsersRequest_Filter } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { UserRegistryPageSkeleton } from "./user-registry-page-skeleton";

type UserRegistryPageProps = {
  className?: string;
};

export const UserRegistryPage: FC<UserRegistryPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const pagination = usePagination();
  const createModal = useCreateUserModal();
  const updateModal = useUpdateUserModal();
  const [filtersResult, setFiltersResult] =
    useState<Partial<GetUsersRequest_Filter>>();
  // const { sortValue, handleChangeSort } = useSort();

  const usersQuery = useGetUsers(filtersResult);

  const rows = usersQuery.data?.users.map((user) => (
    <UserRow
      key={user.id}
      user={user}
      actions={
        <>
          <MenuItem onClick={() => updateModal.updateUser(user.id)}>
            {t("update_user")}
          </MenuItem>
        </>
      }
      renderHideUser={(userId, checked) => (
        <HideUserButton
          className={"!justify-start"}
          userId={userId}
          checked={checked}
        />
      )}
      renderBlockUser={(userId, checked) => (
        <BlockUserButton
          className={"!justify-start"}
          userId={userId}
          checked={checked}
        />
      )}
      renderVerifyUser={(userId, checked) => (
        <VerifyUserButton
          className={"!justify-start"}
          userId={userId}
          checked={checked}
        />
      )}
    />
  ));

  const handleSubmitFilters = (data: Partial<GetUsersRequest_Filter>) => {
    setFiltersResult(data);
  };

  if (usersQuery.isLoading) {
    return <UserRegistryPageSkeleton className={className} />;
  }

  return (
    <>
      <div className={clsx("p-8", className)}>
        <div className="flex gap-4 justify-between">
          <UserRegistryFilters
            className="grow"
            onSubmit={handleSubmitFilters}
            isPending={usersQuery.isFetching}
          />
          <ActionIcon onClick={createModal.createUser}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <Table.Th>{t("email")}</Table.Th>
              <Table.Th>{t("first_name")}</Table.Th>
              <Table.Th>{t("last_name")}</Table.Th>
              <Table.Th>{t("country_сode")}</Table.Th>
              <Table.Th>{t("registry_date")}</Table.Th>
              <Table.Th>{t("verified")}</Table.Th>
              <Table.Th>{t("block")}</Table.Th>
              <Table.Th>{t("deleted")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          total={
            usersQuery.data?.users.length
              ? usersQuery.data?.users.length / pagination.pageSize
              : 0
          }
          disabled={usersQuery.isPending}
          value={pagination.page}
          onChange={(page) => {
            pagination.handlePageChange(
              page,
              usersQuery.data!.users.length / pagination.pageSize,
            );
          }}
          // total={usersQuery.data?.totalPages ?? 0}
        />
      </div>
      {createModal.modal}
      {updateModal.modal}
    </>
  );
};
