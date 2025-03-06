"use client";

import { Button, Title } from "@mantine/core";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
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
  const [filterByUser, setFilterByUser] = useState<number | null>(null);

  const historiesQuery = useGetHistories({
    startDate: dates[0],
    endDate: dates[1],
    userId: filterByUser ?? undefined,
  });
  const historiesDetailedQuery = useGetDetailedHistories({
    date: selectedDate,
    userIds: filterByUser ? [filterByUser] : selectedUsers,
    isRequestedOnly: !!filterByUser,
  });

  const usersSelectData = useMemo(() => {
    if (!usersQuery.data?.users) return [];

    return usersQuery.data.users.map((user) => ({
      value: user.id.toString(),
      label: user.email,
    }));
  }, [usersQuery.data]);

  const updateUserBalance = useUpdateUserBalanceModal();
  const debitAllTips = useDebitAllTipsModal();

  const handleChangeFilterByUser = (userId: string | null) => {
    if (userId === null) {
      setFilterByUser(null);
      return;
    }
    setFilterByUser(Number(userId));
  };

  const handleSubmitDateRange = (data: {
    dates: [Date, Date];
    userId: string | null;
  }) => {
    setDates(data.dates);
    handleChangeFilterByUser(data.userId);
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
          onSubmit={handleSubmitDateRange}
          result={dates}
          usersData={usersSelectData}
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
