"use client";

import { ActionIcon, Button, Text, Title, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { FileDown } from "lucide-react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo, useState } from "react";
import { OrderStatusText, useGetOrdersForClient } from "@/entities/order";
import { useGetTariffs } from "@/entities/tariff";
import { useDownloadInvoice } from "@/features/manage-invoices";

import { useAddUserOrderModal } from "@/features/manage-user-orders";
import { OrdersFilters, OrdersFiltersT } from "@/features/order-filters";
import { ManageUserOrderProvider } from "@/screens/user-orders-page/providers";
import { formatDate } from "@/shared/lib";
import { sortDecimal } from "@/shared/lib/decimal";
import { useTranslations } from "@/shared/locale/translations";
import {
  GetOrdersRequest_Filter,
  Order,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { CurrencyCell } from "@/shared/ui";
import { useReactTable } from "@/shared/ui/use-react-table";

type OrdersPageProps = {
  className?: string;
};

export const UserOrdersPage: FC<OrdersPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const createModal = useAddUserOrderModal();
  const tariffsQuery = useGetTariffs({});
  const downloadInvoice = useDownloadInvoice();

  const [filtersResult, setFiltersResult] = useState<GetOrdersRequest_Filter>({
    orderStatus: undefined,
  });

  const ordersQuery = useGetOrdersForClient();
  console.log(ordersQuery);
  const filteredOrders = useMemo(() => {
    return ordersQuery.data?.orders.filter((order) =>
      filtersResult.orderStatus
        ? order.orderStatus === filtersResult.orderStatus
        : true,
    );
  }, [filtersResult.orderStatus, ordersQuery.data?.orders]);

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: t("order_id"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "createdAt",
        header: t("order_created_at"),
        sortingFn: "datetime",
        Cell: ({ cell }) => (
          <Text size="2xs">{formatDate(cell.row.original.createdAt)}</Text>
        ),
      },
      {
        accessorKey: "tariff.totalPrice",
        header: t("order_total_price"),
        sortingFn: (rowA, rowB) =>
          sortDecimal(
            rowA.original.tariff?.totalPrice,
            rowB.original.tariff?.totalPrice,
          ),
        Cell: ({ cell }) => (
          <CurrencyCell
            currency={cell.row.original.tariff?.currency ?? "USD"}
            value={cell.row.original.tariff?.totalPrice}
          />
        ),
      },
      {
        accessorKey: "tariff.name",
        header: t("order_tariff_name"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "tariff.totalTipsCount",
        header: t("total_tips_count"),
        sortingFn: "basic",
      },
      {
        enableSorting: false,
        accessorKey: "orderStatus",
        header: t("order_status"),
        sortingFn: "alphanumeric",
        Cell: ({ cell }) => (
          <OrderStatusText status={cell.row.original.orderStatus} />
        ),
      },
      {
        accessorKey: "invoice.guid",
        header: t("invoice_guid_order"),
        sortingFn: "basic",
      },
      {
        accessorKey: "paidAt",
        header: t("order_paid_at"),
        sortingFn: "datetime",
        Cell: ({ cell }) => (
          <Text size="2xs">{formatDate(cell.row.original.paidAt)}</Text>
        ),
      },
      {
        accessorKey: "tariff.currency",
        header: t("order_pay_type"),
        sortingFn: "basic",
      },
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: filteredOrders ?? [],
    renderRowActions: ({ cell }) =>
      cell.row.original.invoice?.guid && (
        <Tooltip label={t("download_invoice_in_order")}>
          <ActionIcon
            variant={"outline"}
            onClick={() =>
              downloadInvoice.mutateAsync({
                invoiceId: cell.row.original.invoice!.guid!,
              })
            }
          >
            <FileDown size={20} />
          </ActionIcon>
        </Tooltip>
      ),
    state: {
      isLoading: ordersQuery.isLoading,
    },
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 135,
    },
  });

  const handleSubmitFilters = (data: OrdersFiltersT) => {
    setFiltersResult(data);
    table.setPageIndex(0);
  };

  return (
    <ManageUserOrderProvider tariffs={tariffsQuery.data?.tariffs ?? []}>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title size="h1" className="mb-6">
            {t("my_orders")}
          </Title>
          <Button size="sm" onClick={createModal.addOrder}>
            {t("create_order")}
          </Button>
        </div>
        <OrdersFilters
          className="grow mb-6"
          result={filtersResult}
          onSubmit={handleSubmitFilters}
          isPending={ordersQuery.isFetching}
        />
        <MantineReactTable table={table} />
      </div>
      {createModal.modal}
    </ManageUserOrderProvider>
  );
};
