"use client";

import { ActionIcon, Button, Menu, Text, Title, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo, useState } from "react";
import { useGetUsers } from "@/entities/user";
import {
  BlockUserButton,
  HideUserButton,
  useCreateUserModal,
  useUpdateUserModal,
  VerifyUserButton,
} from "@/features/manage-user";
import { UserRegistryFilters } from "@/features/user-registry-filters";
import { formatDate } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import {
  GetUsersRequest_Filter,
  User,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { useReactTable } from "@/shared/ui/use-react-table";

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

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "email",
        header: t("email"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "firstName",
        header: t("first_name"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "lastName",
        header: t("last_name"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "cca3",
        header: t("country_сode"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "roles",
        header: t("user_roles"),
        sortingFn: "alphanumeric",
        enableColumnActions: false,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => {
          return (
            <div>
              {cell.row.original.roles.map((role) => (
                <Tooltip
                  key={role.id}
                  label={
                    <div>
                      <Text size="2xs">{t("permissions")}:</Text>
                      <ul>
                        {role.permissions.length ? (
                          role.permissions.map((permission) => (
                            <li key={permission.id}>{permission.name}</li>
                          ))
                        ) : (
                          <Text size="2xs">{t("none")}</Text>
                        )}
                      </ul>
                    </div>
                  }
                >
                  <Text>{role.name}</Text>
                </Tooltip>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "registryDate",
        header: t("registry_date"),
        sortingFn: "datetime",
        Cell: ({ cell }) => {
          return (
            <Text size="2xs">{formatDate(cell.row.original.createdAt)}</Text>
          );
        },
      },
      {
        enableSorting: false,
        accessorKey: "isVerified",
        header: t("verified"),
        Cell: ({ cell }) => (
          <VerifyUserButton
            className="!justify-start"
            userId={cell.row.original.id}
            checked={!!cell.row.original.verifiedAt}
          />
        ),
      },
      {
        enableSorting: false,
        accessorKey: "isBlocked",
        header: t("block"),
        Cell: ({ cell }) => (
          <BlockUserButton
            className="!justify-start"
            userId={cell.row.original.id}
            checked={!!cell.row.original.blockedAt}
          />
        ),
      },
      {
        enableSorting: false,
        accessorKey: "isDeleted",
        header: t("deleted"),
        Cell: ({ cell }) => (
          <HideUserButton
            className="!justify-start"
            userId={cell.row.original.id}
            checked={!!cell.row.original.deletedAt}
          />
        ),
      },
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: usersQuery.data?.users ?? [],
    renderRowActions: ({ cell }) => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="light">
            <EllipsisIcon />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => updateModal.updateUser(cell.row.original.id)}
          >
            {t("update_user")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
    state: {
      isLoading: usersQuery.isLoading,
    },
    defaultColumn: {
      minSize: 20,
      maxSize: 200,
      size: 100,
    },
  });

  const handleSubmitFilters = (data: GetUsersRequest_Filter) => {
    setFiltersResult(data);
    table.setPageIndex(0);
  };

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title size="h1" className="mb-6">
            {t("user_registry")}
          </Title>
          <Button size="sm" onClick={createModal.createUser}>
            {t("create_user")}
          </Button>
        </div>
        <UserRegistryFilters
          className="grow mb-6"
          result={filtersResult}
          onSubmit={handleSubmitFilters}
          isPending={usersQuery.isFetching}
        />
        <MantineReactTable table={table} />
      </div>
      {createModal.modal}
      {updateModal.modal}
    </>
  );
};
