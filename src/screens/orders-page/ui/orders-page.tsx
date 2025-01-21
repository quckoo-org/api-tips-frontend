"use client";

import { ActionIcon, MenuItem, Table } from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC, useState } from "react";
import { OrderRow, useGetOrders } from "@/entities/order";
import {
  useCreateOrderModal,
  useUpdateOrderModal,
} from "@/features/manage-order";
import { OrdersFilters, OrdersFiltersT } from "@/features/order-filters";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useSort } from "@/shared/hooks/use-sort";
import { useTranslations } from "@/shared/locale/translations";
import { SortTh } from "@/shared/ui/sort-th";
import { OrdersPageError } from "./orders-page-error";
import { OrdersPageSkeleton } from "./orders-page-skeleton";
// import { OrderOrderBy } from "@/shared/proto/order/v1/order";

// TODO MOCK TYPE
export enum OrderOrderBy {
  email = "email",
  first_name = "first_name",
}

type OrdersPageProps = {
  className?: string;
};

export const OrdersPage: FC<OrdersPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const pagination = usePagination(10, 10);
  const updateModal = useUpdateOrderModal();
  const createModal = useCreateOrderModal();
  const [filtersResult, setFiltersResult] = useState<OrdersFiltersT>();
  const { sortValue, handleChangeSort } = useSort<OrderOrderBy>();

  const ordersQuery = useGetOrders({
    page: pagination.page,
    pageSize: pagination.pageSize,
    // ...(filtersResult.isDeleted !== null
    //   ? { isDeleted: filtersResult.isDeleted }
    //   : {}),
    // ...(filtersResult.isBlocked !== null
    //   ? { isBlocked: filtersResult.isBlocked }
    //   : {}),
    // ...(filtersResult.isVerified !== null
    //   ? { isVerified: filtersResult.isVerified }
    //   : {}),
    ...(sortValue?.order ? { order: sortValue.order } : {}),
    ...(sortValue?.value ? { orderBy: sortValue.value } : {}),
  });

  const rows = ordersQuery.data?.orders.map((order) => (
    <OrderRow
      key={order.id}
      order={order}
      actions={
        <>
          <MenuItem>{t("create_bill")}</MenuItem>
          <MenuItem onClick={() => updateModal.updateOrder(order.id)}>
            {t("update_order")}
          </MenuItem>
        </>
      }
    />
  ));

  const handleSubmitFilters = (data: OrdersFiltersT) => {
    // pagination.handlePageChange(1, ordersQuery.data?.totalPages);
    setFiltersResult(data);
  };

  if (ordersQuery.isLoading) {
    return <OrdersPageSkeleton className={className} />;
  }

  if (ordersQuery.isError) {
    return <OrdersPageError className={className} />;
  }

  return (
    <>
      <div className={clsx("p-8", className)}>
        <div className="flex gap-4 justify-between">
          <OrdersFilters
            className="grow"
            result={filtersResult}
            onSubmit={handleSubmitFilters}
            isPending={ordersQuery.isFetching}
          />
          <ActionIcon size="lg" onClick={createModal.createOrder}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <SortTh<OrderOrderBy>
                onSort={handleChangeSort}
                order={
                  sortValue?.value === OrderOrderBy.email
                    ? sortValue?.order
                    : null
                }
                value={OrderOrderBy.email}
              >
                {t("country_сode")}
              </SortTh>
              <SortTh<OrderOrderBy>
                onSort={handleChangeSort}
                order={
                  sortValue?.value === OrderOrderBy.first_name
                    ? sortValue?.order
                    : null
                }
                value={OrderOrderBy.first_name}
              >
                {t("first_name")}
              </SortTh>

              <Table.Th>{t("order_number")}</Table.Th>
              <Table.Th>{t("registry_date")}</Table.Th>
              <Table.Th>{t("sum")}</Table.Th>
              <Table.Th>{t("tariff_name")}</Table.Th>
              <Table.Th>{t("count")}</Table.Th>
              <Table.Th>{t("status")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        {/*<Pagination*/}
        {/*  disabled={ordersQuery.isPending}*/}
        {/*  value={pagination.page}*/}
        {/*  onChange={(page) => {*/}
        {/*    pagination.handlePageChange(page, ordersQuery.data?.totalPages);*/}
        {/*  }}*/}
        {/*  total={ordersQuery.data?.totalPages ?? 0}*/}
        {/*/>*/}
      </div>
      {createModal.modal}
      {updateModal.modal}
    </>
  );
};
