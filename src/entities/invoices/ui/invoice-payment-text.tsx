"use client";

import { Text } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useInvoicesPaymentType } from "@/entities/invoices";
import { ValidPayment } from "@/entities/invoices/model/types";

type InvoiceStatusProps = {
  className?: string;
  paymentType: ValidPayment;
};

export const InvoicePaymentText: FC<InvoiceStatusProps> = ({
  className,
  paymentType,
}) => {
  const { getInvoicePaymentType } = useInvoicesPaymentType();
  return (
    <Text size="2xs" className={clsx("", className)}>
      {getInvoicePaymentType(paymentType)}
    </Text>
  );
};
