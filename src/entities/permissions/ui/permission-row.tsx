import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type PermissionRowProps = {
  className?: string;
  permission: Permission;
  actions: ReactNode;
};

export const PermissionRow: FC<PermissionRowProps> = ({
  className,
  permission,
  actions,
}) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{permission.name}</Table.Td>
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
