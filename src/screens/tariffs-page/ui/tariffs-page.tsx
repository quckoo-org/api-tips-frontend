"use client";

import { ActionIcon, Button, Menu, Text, Title } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
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
import { useReactTable } from "@/shared/ui/use-react-table";
import { TariffsPageError } from "./tariffs-page-error";

type TariffPageProps = {
  className?: string;
};

export const TariffsPage: FC<TariffPageProps> = ({ className }) => {
  const crateModal = useCreateTariffModal();
  const updateModal = useUpdateTariffModal();
  const { t } = useTranslations();

  const tariffsQuery = useGetTariffs({});

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

  const table = useReactTable({
    columns,
    data: tariffsQuery.data?.tariffs ?? [],
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
          <Title size="h1" className="mb-6">
            {t("tariffs")}
          </Title>
          <Button size="sm" onClick={crateModal.createTariff}>
            {t("create_tariff")}
          </Button>
        </div>
        <MantineReactTable table={table} />
      </div>
      {crateModal.modal}
      {updateModal.modal}
    </>
  );
};
