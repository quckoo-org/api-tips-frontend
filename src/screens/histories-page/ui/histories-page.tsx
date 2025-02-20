"use client";

import { Button, Title } from "@mantine/core";
import clsx from "clsx";
import { FC, useState } from "react";
import {
  useDebitAllTipsModal,
  useUpdateUserBalanceModal,
} from "@/features/balance";
import { HistoryFilters } from "@/features/history-filters";
import { dayjs } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { HistoriesTable } from "./histories-table";

type OrdersPageProps = {
  className?: string;
};

export const HistoriesPage: FC<OrdersPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const [dates, setDates] = useState<[Date, Date]>([
    dayjs().subtract(1, "year").startOf("year").toDate(),
    dayjs().add(1, "year").endOf("year").toDate(),
  ]);

  const updateUserBalance = useUpdateUserBalanceModal();
  const debitAllTips = useDebitAllTipsModal();

  const onSubmitDateRange = (dates: { dates: [Date, Date] }) => {
    setDates(dates.dates);
  };

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title size="h1" className="mb-6">
            {t("history")}
          </Title>
          <Button size="sm" onClick={debitAllTips.debitAllTips}>
            {t("debit_all_tips")}
          </Button>
        </div>
        <HistoryFilters
          className="mb-6"
          onSubmit={onSubmitDateRange}
          result={dates}
        />
        <HistoriesTable
          dates={dates}
          updateUserBalance={updateUserBalance.updateUserBalance}
        />
      </div>
      {debitAllTips.modal}
      {updateUserBalance.modal}
    </>
  );
};
