"use client";

import { Button, Title } from "@mantine/core";
import clsx from "clsx";
import { FC, useState } from "react";
import { useGetDetailedHistories, useGetHistories } from "@/entities/histrory";
import { useGetUsers } from "@/entities/user";
import {
  useDebitAllTipsModal,
  useUpdateUserBalanceModal,
} from "@/features/balance";
import { HistoryFilters } from "@/features/history-filters";
import { BalanceProvider } from "@/screens/histories-page/providers";
import { dayjs } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { HistoriesTable } from "@/widgets/histories-table";

type OrdersPageProps = {
  className?: string;
};

export const HistoriesPage: FC<OrdersPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const usersQuery = useGetUsers({});
  const [dates, setDates] = useState<[Date, Date]>([
    dayjs().startOf("year").toDate(),
    dayjs().endOf("year").toDate(),
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const historiesQuery = useGetHistories({
    startDate: dates[0],
    endDate: dates[1],
  });
  const historiesDetailedQuery = useGetDetailedHistories({
    date: selectedDate,
    userIds: selectedUsers,
  });

  const updateUserBalance = useUpdateUserBalanceModal();
  const debitAllTips = useDebitAllTipsModal();

  const onSubmitDateRange = (dates: { dates: [Date, Date] }) => {
    setDates(dates.dates);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSelectUserIds = (userIds: number[]) => {
    setSelectedUsers(userIds);
  };

  return (
    <BalanceProvider users={usersQuery.data?.users ?? []}>
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
          data={historiesQuery.data}
          isLoading={
            historiesQuery.isLoading || historiesDetailedQuery.isLoading
          }
          onSelectDate={handleSelectDate}
          onSelectUserIds={handleSelectUserIds}
          updateUserBalance={updateUserBalance.updateUserBalance}
        />
      </div>
      {debitAllTips.modal}
      {updateUserBalance.modal}
    </BalanceProvider>
  );
};
