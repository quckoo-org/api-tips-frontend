import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { CryptoWalletPayment } from "@/entities/payment";
import { useBanCryptoPayment } from "@/features/manage-payments/model/use-ban-crypto-payment";

type BanPaymentButtonProps = {
  className?: string;
  checked: boolean;
  payment: CryptoWalletPayment;
};

export const BanCryptoPaymentButton: FC<BanPaymentButtonProps> = ({
  className,
  checked,
  payment,
}) => {
  const { handleBanCryptoPayment, isLoading } = useBanCryptoPayment();

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
            handleBanCryptoPayment(payment, value.target.checked)
          }
        />
      )}
    </div>
  );
};
