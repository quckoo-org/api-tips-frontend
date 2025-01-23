import {
  BankAccount,
  CryptoWallet,
  Payment,
} from "@/shared/proto/api_tips_payment/v1/api_tips_payment";

export interface BankAccountPayment extends BankAccount {
  id: Payment["id"];
  isBanned: boolean;
}

export interface CryptoWalletPayment extends CryptoWallet {
  id: Payment["id"];
  isBanned: boolean;
}

export type PaymentT = {
  bankAccount: BankAccountPayment[];
  cryptoWallet: CryptoWalletPayment[];
};
