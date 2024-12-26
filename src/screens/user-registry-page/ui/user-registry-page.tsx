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
import {
  UserRegistryFilters,
  UserRegistryFiltersT,
} from "@/features/user-registry-filters";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useSort } from "@/shared/hooks/use-sort";
import { useTranslations } from "@/shared/locale/translations";
import { UserOrderBy } from "@/shared/proto/user/v1/user";
import { SortTh } from "@/shared/ui/sort-th";
import { UserRegistryPageError } from "./user-registry-page-error";
import { UserRegistryPageSkeleton } from "./user-registry-page-skeleton";

type UserRegistryPageProps = {
  className?: string;
};

export const UserRegistryPage: FC<UserRegistryPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const pagination = usePagination();
  const createModal = useCreateUserModal();
  const updateModal = useUpdateUserModal();
  const [filtersResult, setFiltersResult] = useState<UserRegistryFiltersT>({
    isDeleted: false,
    isBlocked: null,
    isVerified: null,
  });
  const { sortValue, handleChangeSort } = useSort<UserOrderBy>();

  const usersQuery = useGetUsers({
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...(filtersResult.isDeleted !== null
      ? { isDeleted: filtersResult.isDeleted }
      : {}),
    ...(filtersResult.isBlocked !== null
      ? { isBlocked: filtersResult.isBlocked }
      : {}),
    ...(filtersResult.isVerified !== null
      ? { isVerified: filtersResult.isVerified }
      : {}),
    ...(sortValue?.order ? { order: sortValue.order } : {}),
    ...(sortValue?.value ? { orderBy: sortValue.value } : {}),
  });

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

  const handleSubmitFilters = (data: UserRegistryFiltersT) => {
    pagination.handlePageChange(1, usersQuery.data?.totalPages);
    setFiltersResult(data);
  };

  if (usersQuery.isLoading) {
    return <UserRegistryPageSkeleton className={className} />;
  }

  if (usersQuery.isError) {
    return <UserRegistryPageError className={className} />;
  }

  return (
    <>
      <div className={clsx("p-8", className)}>
        <div className="flex gap-4 justify-between">
          <UserRegistryFilters
            className="grow"
            result={filtersResult}
            onSubmit={handleSubmitFilters}
            isPending={usersQuery.isFetching}
          />
          <ActionIcon size="lg" onClick={createModal.createUser}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <SortTh<UserOrderBy>
                onSort={handleChangeSort}
                order={
                  sortValue?.value === UserOrderBy.email
                    ? sortValue?.order
                    : null
                }
                value={UserOrderBy.email}
              >
                {t("email")}
              </SortTh>
              <SortTh<UserOrderBy>
                onSort={handleChangeSort}
                order={
                  sortValue?.value === UserOrderBy.first_name
                    ? sortValue?.order
                    : null
                }
                value={UserOrderBy.first_name}
              >
                {t("first_name")}
              </SortTh>
              <SortTh<UserOrderBy>
                onSort={handleChangeSort}
                order={
                  sortValue?.value === UserOrderBy.last_name
                    ? sortValue?.order
                    : null
                }
                value={UserOrderBy.last_name}
              >
                {t("last_name")}
              </SortTh>
              <SortTh<UserOrderBy>
                onSort={handleChangeSort}
                order={
                  sortValue?.value === UserOrderBy.countryCode
                    ? sortValue?.order
                    : null
                }
                value={UserOrderBy.countryCode}
              >
                {t("country_сode")}
              </SortTh>
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
          disabled={usersQuery.isPending}
          value={pagination.page}
          onChange={(page) => {
            pagination.handlePageChange(page, usersQuery.data?.totalPages);
          }}
          total={usersQuery.data?.totalPages ?? 0}
        />
      </div>
      {createModal.modal}
      {updateModal.modal}
    </>
  );
};
