import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import dayjs from "@/shared/lib/dayjs-in";
import { User } from "@/shared/proto/user/v1/user";

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
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.lastname}</Table.Td>
      <Table.Td>{user?.country?.name ?? "-"}</Table.Td>
      <Table.Td>{dayjs(user.createdAt).format("DD.MM.YYYY")}</Table.Td>
      <Table.Td>{user.roles.map((role) => role.value).join(" ")}</Table.Td>
      <Table.Td>{user.lastIp}</Table.Td>
      <Table.Td>{user.token}</Table.Td>
      <Table.Td>{renderVerifyUser(user.id, user.isVerified)}</Table.Td>
      <Table.Td>{renderBlockUser(user.id, user.isBlocked)}</Table.Td>
      <Table.Td>{renderHideUser(user.id, user.isHidden)}</Table.Td>
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
