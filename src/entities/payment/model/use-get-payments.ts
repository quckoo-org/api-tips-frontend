"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BankAccountPayment, CryptoWalletPayment } from "@/entities/payment";
import { usePaymentClient } from "@/shared/grpc/clients/use-payment-client";
import { QUERY_KEYS } from "@/shared/lib";

export const useGetPayments = () => {
  const { getAllPayments } = usePaymentClient();

  return useQuery({
    queryKey: [QUERY_KEYS.PAYMENTS],
    queryFn: async ({ signal }) => {
      const response = await getAllPayments({}, { signal });

      return response;
    },
    select: (data) => ({
      bankAccount: data.payments
        .filter((payment) => payment.PaymentType?.$case === "bankAccount")
        .map(
          (payment) =>
            ({
              id: payment.id,
              ...payment.PaymentType?.value,
              isBanned: payment.isBanned,
            }) as BankAccountPayment,
        ),
      cryptoWallet: data.payments
        .filter((payment) => payment.PaymentType?.$case === "cryptoWallet")
        .map(
          (payment) =>
            ({
              id: payment.id,
              ...payment.PaymentType?.value,
              isBanned: payment.isBanned,
            }) as CryptoWalletPayment,
        ),
    }),
    placeholderData: keepPreviousData,
  });
};
