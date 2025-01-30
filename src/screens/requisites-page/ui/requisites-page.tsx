"use client";

import clsx from "clsx";

import { FC } from "react";
import { BankRequisitesTable } from "@/widgets/bank-requisites-table/ui/bank-requisites-table";
import { CryptoRequisitesTable } from "@/widgets/crypto-requisites-table/ui/crypto-requisites-table";

type TariffPageProps = {
  className?: string;
};

export const RequisitesPage: FC<TariffPageProps> = ({ className }) => {
  return (
    <>
      <div className={clsx("", className)}>
        <div>
          <BankRequisitesTable />
        </div>
        <div className={"mt-4"}>
          <CryptoRequisitesTable />
        </div>
      </div>
    </>
  );
};
