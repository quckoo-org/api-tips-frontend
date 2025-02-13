"use client";

import { Title } from "@mantine/core";
import clsx from "clsx";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { FC, useMemo } from "react";
import { useGetRequisites } from "@/entities/requisites";
import { BanRequisiteButton } from "@/features/manage-requisites";
import { useTranslations } from "@/shared/locale/translations";
import { CryptoWallet } from "@/shared/proto/api_tips_requisites/v1/api_tips_requisites";

type RequisitesPageProps = {
  className?: string;
};

export const CryptoRequisitesTable: FC<RequisitesPageProps> = ({
  className,
}) => {
  const { t } = useTranslations();

  const requisitesQuery = useGetRequisites();

  const columns = useMemo<MRT_ColumnDef<CryptoWallet>[]>(
    () => [
      {
        accessorKey: "address",
        header: t("crypto_address"),
        enableSorting: false,
      },
      {
        accessorKey: "wallet",
        header: t("crypto_wallet"),
        enableSorting: false,
      },
      {
        accessorKey: "token",
        header: t("crypto_token"),
        enableSorting: false,
      },
      {
        accessorKey: "cryptoCurrencyType",
        header: t("crypto_currency_type"),
        enableSorting: false,
      },
      {
        accessorKey: "isBanned",
        header: t("is_banned"),
        enableSorting: false,
        Cell: ({ cell }) => (
          <BanRequisiteButton
            requisiteId={cell.row.original.requisiteId}
            checked={!!cell.row.original.isBanned}
          />
        ),
      },
    ],
    [t],
  );

  const table = useMantineReactTable({
    columns,
    data: requisitesQuery.data?.cryptoWallet
      ? [requisitesQuery.data.cryptoWallet]
      : [],
    enablePagination: false,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    enableColumnActions: false,
    positionActionsColumn: "last",
    enableColumnDragging: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    filterFromLeafRows: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    state: {
      showSkeletons: requisitesQuery.isLoading,
      pagination: {
        pageSize: 1,
        pageIndex: 1,
      },
    },
    initialState: { density: "xs" },
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 140,
    },
  });

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title order={3} className="font-normal mb-4">
            {t("crypto_requisites")}
          </Title>
        </div>
        <MantineReactTable table={table} />
      </div>
    </>
  );
};
