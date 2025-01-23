import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { BankAccountPayment } from "@/entities/payment";
import { useBanBankPayment } from "@/features/manage-payments/model/use-ban-bank-payment";

type BanPaymentButtonProps = {
  className?: string;
  checked: boolean;
  payment: BankAccountPayment;
};

export const BanBankPaymentButton: FC<BanPaymentButtonProps> = ({
  className,
  checked,
  payment,
}) => {
  const { handleBanBankPayment, isLoading } = useBanBankPayment();

  return (
    <div
      className={clsx("flex justify-start items-center relative", className)}
    >
      {isLoading ? (
        <Loader size="xs" />
      ) : (
        <Checkbox
          disabled={isLoading}
          checked={checked}
          onChange={(value) =>
            handleBanBankPayment(payment, value.target.checked)
          }
        />
      )}
    </div>
  );
};
