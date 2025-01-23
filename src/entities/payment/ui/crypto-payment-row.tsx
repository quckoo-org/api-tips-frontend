import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Payment } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";

type CryptoPaymentRowProps = {
  className?: string;
  payment: Payment;
  actions: ReactNode;
  renderBanPayment: (
    paymentId: number | undefined,
    checked: boolean,
  ) => ReactNode;
};

export const CryptoPaymentRow: FC<CryptoPaymentRowProps> = ({
  className,
  payment,
  actions,
  renderBanPayment,
}) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{payment.cryptoWallet?.address}</Table.Td>
      <Table.Td>{payment.cryptoWallet?.wallet}</Table.Td>
      <Table.Td>{payment.cryptoWallet?.wallet}</Table.Td>
      <Table.Td>{payment.cryptoWallet?.token}</Table.Td>
      <Table.Td>{payment.cryptoWallet?.cryptoCurrencyType}</Table.Td>
      <Table.Td>
        {renderBanPayment(payment.id, !!payment.cryptoWallet?.isBanned)}
      </Table.Td>
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
