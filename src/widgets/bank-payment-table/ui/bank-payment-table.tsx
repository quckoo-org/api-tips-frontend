"use client";

import { ActionIcon, Menu, Title } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { FC, useMemo } from "react";
import { BankAccountPayment, useGetPayments } from "@/entities/payment";
import {
  BanBankPaymentButton,
  useUpdateBankPaymentModal,
} from "@/features/manage-payments";
import { useTranslations } from "@/shared/locale/translations";
import { BankPaymentSkeleton } from "@/widgets/bank-payment-table/ui/bank-payment-skeleton";

type PaymentPageProps = {
  className?: string;
};

export const BankPaymentsTable: FC<PaymentPageProps> = ({ className }) => {
  const updateModal = useUpdateBankPaymentModal();
  const { t } = useTranslations();

  const paymentsQuery = useGetPayments();

  const columns = useMemo<MRT_ColumnDef<BankAccountPayment>[]>(
    () => [
      {
        accessorKey: "bankName",
        header: t("bank_name"),
        enableSorting: false,
      },
      {
        accessorKey: "bankAddress",
        header: t("bank_address"),
        enableSorting: false,
      },
      {
        accessorKey: "swift",
        header: t("swift"),
        enableSorting: false,
      },
      {
        accessorKey: "accountNumber",
        header: t("account_number"),
        enableSorting: false,
      },
      {
        accessorKey: "iban",
        header: t("iban"),
        enableSorting: false,
      },
      {
        accessorKey: "additionalInfo",
        header: t("additional_info"),
        enableSorting: false,
      },
      {
        accessorKey: "isBanned",
        header: t("is_banned"),
        enableSorting: false,
        Cell: ({ cell }) => (
          <BanBankPaymentButton
            payment={cell.row.original}
            checked={cell.row.original.isBanned}
          />
        ),
      },
    ],
    [t],
  );

  const table = useMantineReactTable<BankAccountPayment>({
    columns,
    data: paymentsQuery.data?.bankAccount ?? [],
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
            onClick={() => updateModal.updatePayment(cell.row.original)}
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
    return <BankPaymentSkeleton className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title order={3} className="font-normal mb-4">
            {t("bank_payments")}
          </Title>
        </div>
        <MantineReactTable table={table} />
      </div>
      {updateModal.modal}
    </>
  );
};
