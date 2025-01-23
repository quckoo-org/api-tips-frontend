import { CryptoWalletPayment } from "@/entities/payment";
import { useUpdatePayment } from "./use-update-payment";

export const useBanCryptoPayment = () => {
  const mutation = useUpdatePayment();

  const handleBanCryptoPayment = async (
    payment: CryptoWalletPayment,
    checked: boolean,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, isBanned, ...PaymentValue } = payment;
    await mutation.mutateAsync(
      {
        payment: {
          id: id,
          PaymentType: {
            $case: "cryptoWallet",
            value: PaymentValue,
          },
          isBanned: checked,
        },
      },
      {
        onSuccess: () => {
          // toast.success(t("the_tariff_has_been_successfully_hide"));
        },
        onError: () => {
          //toast.error(t("couldn't_hide_the_tariff"));
        },
      },
    );
  };

  return { handleBanCryptoPayment, isLoading: mutation.isPending };
};
