import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { dayjs } from "@/shared/lib";
import { OrderT } from "../model/types";

type UserRowProps = {
  className?: string;
  order: OrderT;
  actions: ReactNode;
};

export const OrderRow: FC<UserRowProps> = ({ className, order, actions }) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{order.email}</Table.Td>
      <Table.Td>
        {order.firstName} {order.lastName}
      </Table.Td>
      <Table.Td>{order?.orderNumber}</Table.Td>
      <Table.Td>{dayjs(order.createdAt.seconds).format("DD.MM.YYYY")}</Table.Td>
      <Table.Td>{order.sum}</Table.Td>
      <Table.Td>{order.tariff.name}</Table.Td>
      <Table.Td>{order.count}</Table.Td>
      <Table.Td>{order.status}</Table.Td>
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
