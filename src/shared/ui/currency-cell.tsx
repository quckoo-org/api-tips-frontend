import { Table } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { fromDecimal } from "@/shared/lib";
import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

type CurrencyCellProps = {
  className?: string;
  currency: string;
  value: Decimal | undefined;
};

export const CurrencyCell: FC<CurrencyCellProps> = ({
  className,
  currency,
  value,
}) => {
  return (
    <Table.Td className={clsx("", className)}>
      {fromDecimal(value) + " " + currency}
    </Table.Td>
  );
};
