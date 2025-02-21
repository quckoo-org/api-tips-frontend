"use client";

import { ActionIcon, Button, Loader, Menu, Text, Title } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { OrderStatusText, useGetOrders } from "@/entities/order";
import { useGetTariffs } from "@/entities/tariff";
import { useGetUsers } from "@/entities/user";
import { useCreateInvoiceModal } from "@/features/manage-invoices";
import {
  useAddOrderModal,
  useCancelOrder,
  usePaidOrder,
} from "@/features/manage-order";
import { OrdersFilters, OrdersFiltersT } from "@/features/order-filters";
import { formatDate } from "@/shared/lib";
import { sortDecimal } from "@/shared/lib/decimal";
import { useTranslations } from "@/shared/locale/translations";
import {
  GetOrdersRequest_Filter,
  Order,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { CurrencyCell } from "@/shared/ui";
import { useReactTable } from "@/shared/ui/use-react-table";
import { MenageOrderProvider } from "../providers";

type OrdersPageProps = {
  className?: string;
};

export const OrdersPage: FC<OrdersPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const createModal = useAddOrderModal();
  const cancelOrderMutation = useCancelOrder();
  const paidOrderMutation = usePaidOrder();
  const usersQuery = useGetUsers({});
  const tariffsQuery = useGetTariffs({});
  const createInvoiceModal = useCreateInvoiceModal();

  const [filtersResult, setFiltersResult] = useState<GetOrdersRequest_Filter>({
    orderStatus: undefined,
  });

  const ordersQuery = useGetOrders({
    filter: {
      ...(filtersResult?.orderStatus !== null &&
      filtersResult?.orderStatus !== undefined
        ? { orderStatus: filtersResult.orderStatus }
        : {}),
    },
  });

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "user.email",
        header: t("email"),
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "fullName",
        header: t("full_name"),
        sortingFn: "alphanumeric",
        Cell: ({ cell }) => (
          <Text size="2xs">
            {cell.row.original.user?.firstName +
              " " +
              cell.row.original.user?.lastName}
          </Text>
        ),
      },
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
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: ordersQuery.data?.orders ?? [],
    renderRowActions: ({ cell }) => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="light">
            <EllipsisIcon />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() =>
              paidOrderMutation.mutateAsync({
                orderId: cell.row.original.id,
                paymentDate: new Date(),
              })
            }
          >
            <div className="flex gap-x-2">
              {paidOrderMutation.isPending && <Loader />}
              <Text>{t("set_order_status_to_paid")}</Text>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              cancelOrderMutation.mutateAsync({ orderId: cell.row.original.id })
            }
          >
            <div className="flex gap-x-2">
              {cancelOrderMutation.isPending && <Loader />}
              <Text>{t("cancel_order")}</Text>
            </div>
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              createInvoiceModal.addInvoice(cell.row.original.id, () =>
                toast.success(t("invoice_created_successfully")),
              )
            }
          >
            <Text>{t("create_invoice")}</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
    <MenageOrderProvider
      tariffs={tariffsQuery.data?.tariffs ?? []}
      users={usersQuery.data?.users ?? []}
    >
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title size="h1" className="mb-6">
            {t("orders")}
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
      {createInvoiceModal.modal}
    </MenageOrderProvider>
  );
};
