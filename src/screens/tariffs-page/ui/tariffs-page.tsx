"use client";

import { ActionIcon, Menu, Text, Title } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { FC, useMemo } from "react";
import { useGetTariffs } from "@/entities/tariff";
import {
  HideTariffButton,
  useCreateTariffModal,
  useUpdateTariffModal,
} from "@/features/manage-tariff";
import { formatDate } from "@/shared/lib";
import { sortDecimal } from "@/shared/lib/decimal";
import { useTranslations } from "@/shared/locale/translations";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { CurrencyCell } from "@/shared/ui";
import { TariffsPageError } from "./tariffs-page-error";

type TariffPageProps = {
  className?: string;
};

export const TariffsPage: FC<TariffPageProps> = ({ className }) => {
  const crateModal = useCreateTariffModal();
  const updateModal = useUpdateTariffModal();
  const { t } = useTranslations();

  const tariffsQuery = useGetTariffs({});

  console.log(tariffsQuery.data?.tariffs, "tariffs");

  const columns = useMemo<MRT_ColumnDef<Tariff>[]>(
    () => [
      {
        accessorKey: "startDate",
        header: t("start_date"),
        sortingFn: "alphanumeric",
        Cell: ({ cell }) => (
          <Text size="2xs">{formatDate(cell.row.original.startDate)}</Text>
        ),
      },
      {
        accessorKey: "endDate",
        header: t("end_date"),
        sortingFn: "datetime",
        Cell: ({ cell }) => (
          <Text size="2xs">{formatDate(cell.row.original.endDate)}</Text>
        ),
      },
      {
        accessorKey: "name",
        header: t("name"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "freeTipsCount",
        header: t("free_tips_count"),
        sortingFn: "basic",
      },
      {
        accessorKey: "paidTipsCount",
        header: t("paid_tips_count"),
        sortingFn: "basic",
      },
      {
        accessorKey: "totalTipsCount",
        header: t("total_tips_count"),
        sortingFn: "basic",
      },
      {
        accessorKey: "tipPrice",
        header: t("tip_price"),
        sortingFn: (rowA, rowB) =>
          sortDecimal(rowA.original.tipPrice, rowB.original.totalPrice),
        Cell: ({ cell }) => (
          <CurrencyCell
            currency={cell.row.original.currency}
            value={cell.row.original.tipPrice}
          />
        ),
      },
      {
        accessorKey: "totalPrice",
        header: t("total_price"),
        sortingFn: (rowA, rowB) =>
          sortDecimal(rowA.original.totalPrice, rowB.original.totalPrice),
        Cell: ({ cell }) => (
          <CurrencyCell
            currency={cell.row.original.currency}
            value={cell.row.original.totalPrice}
          />
        ),
      },
      {
        accessorKey: "hiddenAt",
        header: t("hidden"),
        sortingFn: "alphanumeric",
        Cell: ({ cell }) => (
          <HideTariffButton
            tariffId={cell.row.original.id}
            checked={!!cell.row.original.hiddenAt}
          />
        ),
      },
    ],
    [t],
  );

  const table = useMantineReactTable({
    columns,
    data: tariffsQuery.data?.tariffs ?? [],
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableRowActions: true,
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    enableColumnDragging: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    filterFromLeafRows: false,
    enableTopToolbar: false,
    renderRowActions: ({ cell }) => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="light">
            <EllipsisIcon />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => updateModal.updateTariff(cell.row.original)}
          >
            {t("update_tariff")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
    state: {
      isLoading: tariffsQuery.isLoading,
    },
    initialState: { density: "xs" },
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 140,
    },
  });

  if (tariffsQuery.isError) {
    return <TariffsPageError className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title order={3} className="font-normal mb-4">
            {t("tariffs")}
          </Title>
          <ActionIcon onClick={crateModal.createTariff}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <MantineReactTable table={table} />
      </div>
      {crateModal.modal}
      {updateModal.modal}
    </>
  );
};
