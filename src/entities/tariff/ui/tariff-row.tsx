import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { formatDate } from "@/shared/lib";
import { fromDecimal } from "@/shared/lib/decimal";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";

type TariffRowProps = {
  className?: string;
  tariff: Tariff;
  actions: ReactNode;
  renderHideTariff: (tariffId: number, checked: boolean) => ReactNode;
};

export const TariffRow: FC<TariffRowProps> = ({
  className,
  tariff,
  actions,
  renderHideTariff,
}) => {
  console.log(tariff, "tt");
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{formatDate(tariff.startDate)}</Table.Td>
      <Table.Td>{formatDate(tariff.endDate)}</Table.Td>
      <Table.Td>{tariff.name}</Table.Td>
      <Table.Td>{tariff.freeTipsCount}</Table.Td>
      <Table.Td>{tariff.paidTipsCount}</Table.Td>
      <Table.Td>{tariff.totalTipsCount}</Table.Td>
      <Table.Td>{fromDecimal(tariff.tipPrice)}</Table.Td>
      <Table.Td>{fromDecimal(tariff.totalPrice)}</Table.Td>
      <Table.Td>{renderHideTariff(tariff.id, !!tariff.hiddenAt)}</Table.Td>
      <Table.Td className="w-12">
        <Menu zIndex={100} closeOnItemClick={false}>
          <Menu.Target>
            <ActionIcon variant="light">
              <EllipsisIcon />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>{actions}</Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  );
};
