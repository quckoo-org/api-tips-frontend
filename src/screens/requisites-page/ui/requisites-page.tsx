"use client";

import clsx from "clsx";

import { FC } from "react";
import { BankRequisitesTable, CryptoRequisitesTable } from "@/widgets";

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
