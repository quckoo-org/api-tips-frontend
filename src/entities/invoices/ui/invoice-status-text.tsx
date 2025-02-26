"use client";

import { Text } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { InvoiceStatus as InvoiceStatusEnum } from "@/shared/proto/custom_enums/v1/custom_enums";
import { useGetInvoiceStatus } from "../model/use-get-invoice-status";

type InvoiceStatusProps = {
  className?: string;
  status: InvoiceStatusEnum;
};

export const InvoiceStatusText: FC<InvoiceStatusProps> = ({
  className,
  status,
}) => {
  const { getInvoiceStatus } = useGetInvoiceStatus();
  return (
    <Text size="2xs" className={clsx("", className)}>
      {getInvoiceStatus(status)}
    </Text>
  );
};
