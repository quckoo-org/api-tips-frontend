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
import { UserOrderBy } from "@/features/user-registry-filters/model/types";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useSort } from "@/shared/hooks/use-sort";
import { useTranslations } from "@/shared/locale/translations";
import { GetUsersRequest_Filter } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import List from "@/shared/ui/list";
import { SortTh } from "@/shared/ui/sort-th";
import { UserRegistryPageSkeleton } from "./user-registry-page-skeleton";

type UserRegistryPageProps = {
  className?: string;
};

export const UserRegistryPage: FC<UserRegistryPageProps> = ({ className }) => {
  const { t } = useTranslations();

  const createModal = useCreateUserModal();
  const updateModal = useUpdateUserModal();
  const [filtersResult, setFiltersResult] = useState<GetUsersRequest_Filter>({
    isDeleted: false,
    isBlocked: undefined,
    isVerified: undefined,
    email: "",
  });
  const { sortValue, handleChangeSort } = useSort<UserOrderBy>();
  //TODO: sorting
  const usersQuery = useGetUsers({
    ...(filtersResult.isDeleted !== undefined
      ? { isDeleted: filtersResult.isDeleted }
      : {}),
    ...(filtersResult.isBlocked !== undefined
      ? { isBlocked: filtersResult.isBlocked }
      : {}),
    ...(filtersResult.isVerified !== undefined
      ? { isVerified: filtersResult.isVerified }
      : {}),
    ...(filtersResult.email !== "" ? { email: filtersResult.email } : {}),
  });
  const pagination = usePagination(usersQuery.data?.users.length);

  const rows = (
    <List
      page={pagination.page}
      pageSize={pagination.pageSize}
      items={usersQuery.data?.users}
      itemToRender={(user) => (
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
      )}
    />
  );

  const handleSubmitFilters = (data: GetUsersRequest_Filter) => {
    pagination.handlePageChange(
      1,
      usersQuery.data?.users.length
        ? usersQuery.data?.users.length / pagination.pageSize
        : 0,
    );
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
                  sortValue?.value === UserOrderBy.cca3
                    ? sortValue?.order
                    : null
                }
                value={UserOrderBy.cca3}
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
          total={pagination.totalPages}
          disabled={usersQuery.isPending}
          value={pagination.page}
          onChange={(page) => {
            pagination.handlePageChange(page, pagination.totalPages);
          }}
        />
      </div>
      {createModal.modal}
      {updateModal.modal}
    </>
  );
};
