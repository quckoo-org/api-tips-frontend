import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type RoleRowProps = {
  className?: string;
  role: Role;
  actions: ReactNode;
};

export const RoleRow: FC<RoleRowProps> = ({ className, role, actions }) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{role.name}</Table.Td>
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
