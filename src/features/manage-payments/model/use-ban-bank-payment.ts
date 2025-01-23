import { BankAccountPayment } from "@/entities/payment";
import { useUpdatePayment } from "./use-update-payment";

export const useBanBankPayment = () => {
  const mutation = useUpdatePayment();

  const handleBanBankPayment = async (
    payment: BankAccountPayment,
    checked: boolean,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, isBanned, ...PaymentValue } = payment;
    await mutation.mutateAsync(
      {
        payment: {
          id: id,
          PaymentType: {
            $case: "bankAccount",
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

  return { handleBanBankPayment, isLoading: mutation.isPending };
};
