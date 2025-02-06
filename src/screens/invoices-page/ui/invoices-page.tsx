"use client";

import { ActionIcon, Button, Menu, Text, Title } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { EllipsisIcon } from "lucide-react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo, useState } from "react";
import { InvoicePaymentText, useGetInvoices } from "@/entities/invoices";
import { ValidPayment } from "@/entities/invoices/model/types";

import { OrderStatusText } from "@/entities/order";
import { InvoicesFilters, InvoicesFiltersT } from "@/features/invoices-filters";
import {
  useCreateInvoiceModal,
  useDownloadInvoice,
  useUpdateInvoiceModal,
} from "@/features/manage-invoices";
import { formatDate } from "@/shared/lib";
import { sortDecimal } from "@/shared/lib/decimal";
import { useTranslations } from "@/shared/locale/translations";
import { Invoice } from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";
import { OrderStatus } from "@/shared/proto/custom_enums/v1/custom_enums";
import { CurrencyCell } from "@/shared/ui";
import { useReactTable } from "@/shared/ui/use-react-table";

type InvoicesPageProps = {
  className?: string;
};

export const InvoicesPage: FC<InvoicesPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const createModal = useCreateInvoiceModal();
  const updateModal = useUpdateInvoiceModal();
  const downloadInvoice = useDownloadInvoice();

  const invoicesQuery = useGetInvoices();
  const [filtersResult, setFiltersResult] = useState<InvoicesFiltersT>({
    email: "",
    createdDate: null,
    paymentDate: null,
  });
  const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "guid",
        header: t("invoice_guid"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "invoiceOwner.email",
        header: t("email"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "fullName",
        header: t("full_name"),
        sortingFn: "alphanumeric",
        Cell: ({ cell }) => (
          <Text size="2xs">
            {cell.row.original.invoiceOwner?.firstName +
              " " +
              cell.row.original.invoiceOwner?.lastName}
          </Text>
        ),
      },
      {
        accessorKey: "refNumber",
        header: t("invoice_ref_number"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "totalAmount",
        header: t("invoice_total_amount"),
        sortingFn: (rowA, rowB) =>
          sortDecimal(rowA.original.totalAmount, rowB.original.totalAmount),
        Cell: ({ cell }) => (
          <CurrencyCell currency={"$"} value={cell.row.original.totalAmount} />
        ),
      },
      {
        accessorKey: "amountOfRequests",
        header: t("invoice_amount_of_requests"),
        sortingFn: "alphanumeric",
      },
      {
        enableSorting: false,
        accessorKey: "paymentType",
        header: t("invoice_payment_type"),
        sortingFn: "alphanumeric",
        Cell: ({ cell }) => (
          <InvoicePaymentText
            paymentType={cell.row.original.paymentType as ValidPayment}
          />
        ),
      },
      {
        accessorKey: "currency",
        header: t("invoice_currency"),
        sortingFn: "basic",
      },
      {
        accessorKey: "createdDate",
        header: t("invoice_created_date"),
        sortingFn: "datetime",
        Cell: ({ cell }) => (
          <Text size="2xs">{formatDate(cell.row.original.createdDate)}</Text>
        ),
      },
      {
        accessorKey: "paymentDate",
        header: t("invoice_payment_date"),
        sortingFn: "datetime",
        Cell: ({ cell }) => (
          <Text size="2xs">{formatDate(cell.row.original.paymentDate)}</Text>
        ),
      },
      {
        accessorKey: "status",
        header: t("invoice_status"),
        sortingFn: "basic",
        Cell: ({ cell }) => (
          <OrderStatusText status={cell.row.original.status as OrderStatus} />
        ),
      },
      {
        accessorKey: "description",
        header: t("invoice_description"),
        sortingFn: "basic",
      },
    ],
    [t],
  );

  const filteredInvoices = useMemo(() => {
    return invoicesQuery.data?.invoices.filter((invoice) => {
      return (
        invoice.invoiceOwner?.email.includes(filtersResult.email) &&
        (filtersResult.createdDate
          ? dayjs(invoice.createdDate).isSame(
              dayjs(filtersResult.createdDate),
              "day",
            )
          : true) &&
        (filtersResult.paymentDate
          ? dayjs(invoice.paymentDate).isSame(
              dayjs(filtersResult.paymentDate),
              "day",
            )
          : true)
      );
    });
  }, [
    filtersResult.createdDate,
    filtersResult.email,
    filtersResult.paymentDate,
    invoicesQuery.data?.invoices,
  ]);
  const table = useReactTable({
    columns,
    data: filteredInvoices ?? [],
    renderRowActions: ({ cell }) => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="light">
            <EllipsisIcon />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => updateModal.updateInvoice(cell.row.original)}
          >
            {t("update_invoice")}
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              downloadInvoice.mutateAsync({
                invoiceId: cell.row.original.guid!,
              })
            }
          >
            {t("download_invoice")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
    state: {
      isLoading: invoicesQuery.isLoading,
    },
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 135,
    },
  });

  const handleSubmitFilters = (data: InvoicesFiltersT) => {
    setFiltersResult(data);
    table.setPageIndex(0);
  };

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title size="h1" className="mb-6">
            {t("invoices")}
          </Title>
          <Button size="sm" onClick={createModal.addInvoice}>
            {t("create_invoice")}
          </Button>
        </div>
        <InvoicesFilters
          className="grow mb-6"
          result={filtersResult}
          onSubmit={handleSubmitFilters}
        />
        <MantineReactTable table={table} />
      </div>
      {createModal.modal}
      {updateModal.modal}
    </>
  );
};
