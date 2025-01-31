"use client";

import { Select } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetOrderStatus } from "@/entities/order";
import { useTranslations } from "@/shared/locale/translations";
import { GetOrdersRequest_Filter } from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { OrderStatus } from "@/shared/proto/custom_enums/v1/custom_enums";

type OrdersFiltersProps = {
  className?: string;
  onSubmit: (data: GetOrdersRequest_Filter) => void;
  isPending: boolean;
  result: GetOrdersRequest_Filter;
};

export const OrdersFilters: FC<OrdersFiltersProps> = ({
  className,
  onSubmit,
  isPending,
  result,
}) => {
  const { getOrderStatus } = useGetOrderStatus();
  const { t } = useTranslations();

  const STATUSES_DATA: Array<{
    value: Partial<OrderStatus>;
    label: string;
  }> = [
    {
      value: OrderStatus.ORDER_STATUS_CREATED,
      label: getOrderStatus(OrderStatus.ORDER_STATUS_CREATED),
    },
    {
      value: OrderStatus.ORDER_STATUS_CANCELLED,
      label: getOrderStatus(OrderStatus.ORDER_STATUS_CANCELLED),
    },
    {
      value: OrderStatus.ORDER_STATUS_PAID,
      label: getOrderStatus(OrderStatus.ORDER_STATUS_PAID),
    },
  ];

  const { handleSubmit, watch, control } = useForm<GetOrdersRequest_Filter>({
    defaultValues: result,
    // values: filterMapper.toFilters(searchParams) as GetOrdersRequest_Filter,
  });

  const debouncedSubmit = useDebouncedCallback(
    (data: GetOrdersRequest_Filter) => {
      // const filters: GetOrdersRequest_Filter = {
      //   orderStatus: data.orderStatus,
      // };
      // const queryString = filterMapper.toSearchParams(filters);
      // router.push(`?${queryString}`);
      onSubmit(data);
    },
    300,
  );

  const handleSubmitForm = (data: GetOrdersRequest_Filter) => {
    const filteredData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as GetOrdersRequest_Filter;

    debouncedSubmit(filteredData);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const subscription = watch((data) => handleSubmit(handleSubmitForm)(data));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={clsx("mb-2", className)}
    >
      <div className="flex gap-4">
        <Controller
          control={control}
          name="orderStatus"
          render={({ field }) => (
            <Select
              {...field}
              clearable
              disabled={isPending}
              placeholder={t("order_status")}
              label={t("order_status")}
              data={STATUSES_DATA}
            />
          )}
        />
      </div>
    </form>
  );
};
