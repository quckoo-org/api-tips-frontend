"use client";

import { Pagination, Table } from "@mantine/core";
import clsx from "clsx";
import { FC, useState } from "react";
import { UserRow, useGetUsers } from "@/entities/user";
import {
  BlockUserButton,
  CreateUserModal,
  HideUserButton,
  VerifyUserButton,
} from "@/features/manage-user";
import {
  UserRegistryFilters,
  UserRegistryFiltersT,
} from "@/features/user-registry-filters";
import { usePagination } from "@/shared/hooks/usePagination";
import { useTranslations } from "@/shared/locale/translations";
import { UserRegistryPageError } from "./user-registry-page-error";
import { UserRegistryPageSkeleton } from "./user-registry-page-skeleton";

type UserRegistryPageProps = {
  className?: string;
};

export const UserRegistryPage: FC<UserRegistryPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const pagination = usePagination();
  const [filtersResult, setFiltersResult] = useState<UserRegistryFiltersT>();

  const usersQuery = useGetUsers({
    ...filtersResult,
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  const rows = usersQuery.data?.rows.map((user) => (
    <UserRow
      key={user.id}
      user={user}
      actions={<>{/* <UpdateUserModal /> */}</>}
      renderHideUser={(userId, checked) => (
        <HideUserButton userId={userId} checked={checked} />
      )}
      renderBlockUser={(userId, checked) => (
        <BlockUserButton userId={userId} checked={checked} />
      )}
      renderVerifyUser={(userId, checked) => (
        <VerifyUserButton userId={userId} checked={checked} />
      )}
    />
  ));

  const handleSubmitFilters = (data: UserRegistryFiltersT) => {
    setFiltersResult(data);
  };

  if (usersQuery.isLoading) {
    return <UserRegistryPageSkeleton className={className} />;
  }

  if (usersQuery.isError) {
    return <UserRegistryPageError className={className} />;
  }

  return (
    <div className={clsx("", className)}>
      <div className="flex gap-4 justify-between">
        <UserRegistryFilters
          className="grow"
          onSubmit={handleSubmitFilters}
          isPending={usersQuery.isFetching}
        />
        <CreateUserModal />
      </div>
      <Table className="mb-4" striped highlightOnHover>
        <Table.Thead className="bg-primary-200">
          <Table.Tr>
            <Table.Th>{t("email")}</Table.Th>
            <Table.Th>{t("name")}</Table.Th>
            <Table.Th>{t("lastname")}</Table.Th>
            <Table.Th>{t("country")}</Table.Th>
            <Table.Th>{t("registry_date")}</Table.Th>
            <Table.Th>{t("role")}</Table.Th>
            <Table.Th>{t("last_ip")}</Table.Th>
            <Table.Th>{t("token")}</Table.Th>
            <Table.Th>{t("verified")}</Table.Th>
            <Table.Th>{t("block")}</Table.Th>
            <Table.Th>{t("hidden")}</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Pagination
        disabled={usersQuery.isPending}
        value={pagination.page}
        onChange={(page) => {
          pagination.handlePageChange(page, usersQuery.data?.totalPages);
        }}
        total={usersQuery.data?.totalPages ?? 0}
      />
    </div>
  );
};