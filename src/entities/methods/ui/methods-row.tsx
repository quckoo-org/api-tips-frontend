import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type MethodRowProps = {
  className?: string;
  method: Method;
  actions: ReactNode;
};

export const MethodRow: FC<MethodRowProps> = ({
  className,
  method,
  actions,
}) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{method.name}</Table.Td>
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
