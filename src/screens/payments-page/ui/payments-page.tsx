"use client";

import clsx from "clsx";

import { FC } from "react";
import { BankPaymentsTable, CryptoPaymentsTable } from "@/widgets";

type TariffPageProps = {
  className?: string;
};

export const PaymentsPage: FC<TariffPageProps> = ({ className }) => {
  return (
    <>
      <div className={clsx("", className)}>
        <div>
          <BankPaymentsTable />
        </div>
        <div className={"mt-4"}>
          <CryptoPaymentsTable />
        </div>
      </div>
    </>
  );
};
