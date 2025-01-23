import { BankAccountPayment, CryptoWalletPayment } from "@/entities/payment";
import { CryptoCurrency } from "@/shared/proto/custom_enums/v1/custom_enums";

export type BankPaymentFormValues = Omit<BankAccountPayment, "id">;
export interface CryptoPaymentFormValues
  extends Omit<CryptoWalletPayment, "id" | "cryptoCurrencyType"> {
  cryptoCurrencyType: string;
}

export const cryptoCurrencyType: Record<CryptoCurrency, string> = {
  [CryptoCurrency.CRYPTO_CURRENCY_BTC]: "BTC",
  [CryptoCurrency.CRYPTO_CURRENCY_ETC]: "ETC",
  [CryptoCurrency.CRYPTO_CURRENCY_UNSPECIFIED]: "",
  [CryptoCurrency.UNRECOGNIZED]: "",
};
