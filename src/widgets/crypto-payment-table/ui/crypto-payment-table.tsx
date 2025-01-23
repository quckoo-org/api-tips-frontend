"use client";

import { ActionIcon, Menu, Title, Text } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { FC, useMemo } from "react";
import { CryptoWalletPayment, useGetPayments } from "@/entities/payment";
import {
  BanCryptoPaymentButton,
  cryptoCurrencyType,
  useUpdateCryptoPaymentModal,
} from "@/features/manage-payments";
import { useTranslations } from "@/shared/locale/translations";
import { CryptoPaymentSkeleton } from "@/widgets/crypto-payment-table/ui/crypto-payment-skeleton";

type PaymentPageProps = {
  className?: string;
};

export const CryptoPaymentsTable: FC<PaymentPageProps> = ({ className }) => {
  const updateModal = useUpdateCryptoPaymentModal();
  const { t } = useTranslations();

  const paymentsQuery = useGetPayments();

  const columns = useMemo<MRT_ColumnDef<CryptoWalletPayment>[]>(
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
        Cell: ({ cell }) => (
          <Text>
            {cryptoCurrencyType[cell.row.original.cryptoCurrencyType]}
          </Text>
        ),
      },
      {
        accessorKey: "isBanned",
        header: t("is_banned"),
        enableSorting: false,
        Cell: ({ cell }) => (
          <BanCryptoPaymentButton
            payment={cell.row.original}
            checked={cell.row.original.isBanned}
          />
        ),
      },
    ],
    [t],
  );

  const table = useMantineReactTable({
    columns,
    data: paymentsQuery.data?.cryptoWallet ?? [],
    enablePagination: false,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableRowActions: true,
    positionActionsColumn: "last",
    enableColumnDragging: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    filterFromLeafRows: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    renderRowActions: ({ cell }) => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="light">
            <EllipsisIcon />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => updateModal.updateCryptoPayment(cell.row.original)}
          >
            {t("update_tariff")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
    state: {
      isLoading: paymentsQuery.isLoading,
    },
    initialState: { density: "xs" },
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 140,
    },
  });

  if (paymentsQuery.isLoading) {
    return <CryptoPaymentSkeleton className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title order={3} className="font-normal mb-4">
            {t("crypto_payments")}
          </Title>
        </div>
        <MantineReactTable table={table} />
      </div>
      {updateModal.modal}
    </>
  );
};
