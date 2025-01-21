import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { formatDate } from "@/shared/lib";
import { User } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type UserRowProps = {
  className?: string;
  user: User;
  actions: ReactNode;
  renderHideUser: (userId: number, checked: boolean) => ReactNode;
  renderBlockUser: (userId: number, checked: boolean) => ReactNode;
  renderVerifyUser: (userId: number, checked: boolean) => ReactNode;
};

export const UserRow: FC<UserRowProps> = ({
  className,
  user,
  actions,
  renderHideUser,
  renderBlockUser,
  renderVerifyUser,
}) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.firstName}</Table.Td>
      <Table.Td>{user.lastName}</Table.Td>
      <Table.Td>{user?.cca3}</Table.Td>
      <Table.Td className={"max-w-52"}>
        {user.roles.map((role) => role.name).join(", ")}
      </Table.Td>
      <Table.Td>{formatDate(user.createdAt)}</Table.Td>
      <Table.Td>{renderVerifyUser(user.id, !!user.verifiedAt)}</Table.Td>
      <Table.Td>{renderBlockUser(user.id, !!user.blockedAt)}</Table.Td>
      <Table.Td>{renderHideUser(user.id, !!user.deletedAt)}</Table.Td>
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
