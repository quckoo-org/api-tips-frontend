"use client";

import { Text } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useGetOrderStatus } from "@/entities/order";
import { OrderStatus as OrderStatusEnum } from "@/shared/proto/custom_enums/v1/custom_enums";

type OrderStatusProps = {
  className?: string;
  status: OrderStatusEnum;
};

export const OrderStatusText: FC<OrderStatusProps> = ({
  className,
  status,
}) => {
  const { getOrderStatus } = useGetOrderStatus();
  return (
    <Text size="2xs" className={clsx("", className)}>
      {getOrderStatus(status)}
    </Text>
  );
};
