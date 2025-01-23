import { ActionIcon, Menu, Table } from "@mantine/core";
import clsx from "clsx";
import { EllipsisIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Payment } from "@/shared/proto/api_tips_payment/v1/api_tips_payment";

type PaymentRowProps = {
  className?: string;
  payment: Payment;
  actions: ReactNode;
  renderBanPayment: (
    paymentId: number | undefined,
    checked: boolean,
  ) => ReactNode;
};

export const BankPaymentRow: FC<PaymentRowProps> = ({
  className,
  payment,
  actions,
  renderBanPayment,
}) => {
  return (
    <Table.Tr className={clsx("", className)}>
      <Table.Td>{payment.bankAccount?.bankName}</Table.Td>
      <Table.Td>{payment.bankAccount?.bankAddress}</Table.Td>
      <Table.Td>{payment.bankAccount?.swift}</Table.Td>
      <Table.Td>{payment.bankAccount?.accountNumber}</Table.Td>
      <Table.Td>{payment.bankAccount?.iban}</Table.Td>
      <Table.Td>{payment.bankAccount?.additionalInfo}</Table.Td>
      <Table.Td>{payment.bankAccount?.additionalInfo}</Table.Td>
      <Table.Td>
        {renderBanPayment(payment.id, !!payment.bankAccount?.isBanned)}
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
