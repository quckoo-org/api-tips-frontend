"use client";

import { Button, Loader, Title } from "@mantine/core";
import clsx from "clsx";
import { FC, useState } from "react";
import {
  useGetDetailedHistoriesByUser,
  useGetUserHistories,
} from "@/entities/histrory";
import { useGetDetailedUsers } from "@/entities/user";
import { HistoryFilters } from "@/features/history-filters";
import { dayjs } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { HistoriesTable } from "@/widgets/histories-table";

type DashboardPageProps = {
  className?: string;
};

export const DashboardPage: FC<DashboardPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const detailedUser = useGetDetailedUsers();

  const [dates, setDates] = useState<[Date, Date]>([
    dayjs().startOf("year").toDate(),
    dayjs().endOf("year").toDate(),
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const historiesQuery = useGetUserHistories({
    startDate: dates[0],
    endDate: dates[1],
  });

  console.log(historiesQuery.data, "historiesQuery");

  const historiesDetailedQuery = useGetDetailedHistoriesByUser({
    date: selectedDate,
  });

  const onSubmitDateRange = (dates: { dates: [Date, Date] }) => {
    setDates(dates.dates);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  if (detailedUser.isLoading) {
    return <Loader />;
  }

  return (
    <div className={clsx("", className)}>
      <div className="flex justify-between mb-6">
        <div>
          <Title size="h1">{t("your_balance")}</Title>
          <Title
            size="h1"
            className="bg-custom-gradient bg-clip-text text-transparent"
          >
            {detailedUser.data?.detailedUser?.balance ?? 0}
          </Title>
        </div>
        <Button color="dark">{t("top_up_balance")}</Button>
      </div>
      <HistoryFilters
        className="mb-6"
        onSubmit={onSubmitDateRange}
        result={dates}
      />
      <HistoriesTable
        onSelectDate={handleSelectDate}
        data={historiesQuery.data}
        isLoading={historiesQuery.isLoading || historiesDetailedQuery.isLoading}
      />
    </div>
  );
};
