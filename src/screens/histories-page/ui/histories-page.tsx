"use client";

import { Box, Button, Text, Title } from "@mantine/core";
import { getGroupedRowModel } from "@tanstack/react-table";
import clsx from "clsx";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useEffect, useMemo, useState } from "react";
import { useGetDetailedHistories, useGetHistories } from "@/entities/histrory";
import {
  useDebitAllTipsModal,
  useUpdateUserBalanceModal,
} from "@/features/balance";
import { dayjs } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import {
  DetailedHistory,
  History,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";
import { useReactTable } from "@/shared/ui/use-react-table";

type OrdersPageProps = {
  className?: string;
};

export const HistoriesPage: FC<OrdersPageProps> = ({ className }) => {
  const { t } = useTranslations();
  const [expanded, setExpanded] = useState({});
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const updateUserBalance = useUpdateUserBalanceModal();
  const debitAllTips = useDebitAllTipsModal();
  const [selectedDate, setSelectedDate] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: dayjs().startOf("year").toDate(),
    endDate: dayjs().endOf("year").toDate(),
  });

  const [aggregateCase, setAggregateCase] = useState<
    "aggregateByMonth" | "aggregateByUser"
  >("aggregateByMonth");

  const [result, setResult] = useState<History[]>([]);

  console.log(result, "result");

  const [grouping] = useState(["startDate", "userId"]);

  const detailedHistoriesQuery = useGetDetailedHistories({
    startDate: selectedDate.startDate,
    endDate: selectedDate.endDate,
    userId: selectedUserId ?? 0,
  });

  console.log(detailedHistoriesQuery.data?.detailedHistories, "datatat");

  const historiesQuery = useGetHistories({
    aggregateIndicator: { $case: aggregateCase, value: true },
    startDate: selectedDate.startDate,
    endDate: selectedDate.endDate,
  });

  useEffect(() => {
    if (!historiesQuery.data?.histories) return;

    setResult((prevState) => {
      const newData = historiesQuery.data.histories;

      const updatedMonths = prevState.map((month) => {
        const matchingMonth = newData.find((newMonth) => {
          const newDate = dayjs(newMonth.startDate);
          const oldDate = dayjs(month.startDate);

          return (
            newDate.month() === oldDate.month() &&
            newDate.year() === oldDate.year()
          );
        });

        return matchingMonth
          ? { ...month, historyData: matchingMonth.historyData }
          : month;
      });

      const newUniqueMonths = newData.filter(
        (newMonth) =>
          !prevState.some((month) => {
            const newDate = dayjs(newMonth.startDate);
            const oldDate = dayjs(month.startDate);
            return (
              newDate.month() === oldDate.month() &&
              newDate.year() === oldDate.year()
            );
          }),
      );

      return [...updatedMonths, ...newUniqueMonths];
    });
  }, [historiesQuery.data?.histories]);

  useEffect(() => {
    if (!detailedHistoriesQuery.data?.detailedHistories) return;
    if (!selectedUserId) return;

    function mapDetailedHistoryToClient(
      history: DetailedHistory,
      userId: number,
    ) {
      return {
        month: dayjs(history.operationDate).format("MMMM YYYY"),
        startDate: history.operationDate,
        endDate: history.operationDate,
        user: {
          id: userId,
        },
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        creditedFreeTipsCount: history.freeTipsCountChangedTo ?? 0,
        creditedPaidTipsCount: history.paidTipsCountChangedTo ?? 0,
        operationType: history.operationType,
        reason: history.reason,
        totalTipsBalance: history.totalTipsBalance,
      };
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setResult((prevState) => {
      const newData = detailedHistoriesQuery.data.detailedHistories;

      const detailedHistories = newData?.map((item) =>
        mapDetailedHistoryToClient(item, selectedUserId),
      );

      const updatedMonths = prevState.map((month) => {
        const matchingMonth = newData.find((newMonth) => {
          const newDate = dayjs(newMonth.operationDate);
          const oldDate = dayjs(month.startDate);

          return (
            newDate.month() === oldDate.month() &&
            newDate.year() === oldDate.year()
          );
        });

        return matchingMonth
          ? {
              ...month,
              historyData: [...month.historyData, ...detailedHistories],
            }
          : month;
      });

      return updatedMonths;
    });
  }, [detailedHistoriesQuery.data?.detailedHistories]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "startDate",
        header: "Месяц",
        Cell: ({ cell }) => (
          <Text size="sm">
            {dayjs(cell.row.original.startDate).format("MMMM YYYY")}
          </Text>
        ),
      },
      {
        accessorKey: "userId",
        header: "full name",
        Cell: ({ cell }) => (
          <Button
            unstyled
            onClick={() =>
              updateUserBalance.updateUserBalance(cell.row.original.userId)
            }
          >
            <Text size="sm">
              {cell.row.original.firstName + " " + cell.row.original.lastName}
            </Text>
          </Button>
        ),
        AggregatedCell: ({ cell }) => {
          if (!cell.row.original.userId) return null;

          return (
            <Box
              style={{
                color: "skyblue",
                display: "inline",
                fontWeight: "bold",
              }}
            >
              12312
              {/*{cell.row.original.firstName + cell.row.original.lastName}*/}
            </Box>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        AggregatedCell: ({ cell }) => {
          if (!cell.row.original.userId) return null;

          return <Text size="sm">{cell.row.original.email}</Text>;
        },
        Cell: () => <></>,
      },
      {
        accessorKey: "creditedFreeTipsCount",
        header: "Бесплатные подсказки",
        AggregatedCell: ({ cell }) => (
          <Box
            style={{
              color: "skyblue",
              display: "inline",
              fontWeight: "bold",
            }}
          >
            {cell.row.original.creditedFreeTipsCount}
          </Box>
        ),
      },
      {
        accessorKey: "creditedPaidTipsCount",
        header: "Платные подсказки",
        AggregatedCell: ({ cell }) => (
          <Box
            style={{
              color: "skyblue",
              display: "inline",
              fontWeight: "bold",
            }}
          >
            {cell.row.original.creditedPaidTipsCount}
          </Box>
        ),
      },
    ],
    [],
  );

  console.log(historiesQuery.isPending, "is pendiung");

  const formattedData = useMemo(
    () =>
      result.flatMap((monthData) =>
        monthData.historyData.map((userData) => ({
          month: dayjs(monthData.startDate).format("MMMM YYYY"), // Преобразуем дату в название месяца
          startDate: monthData.startDate,
          endDate: monthData.endDate,
          userId: userData.user?.id,
          email: userData.user?.email,
          firstName: userData.user?.firstName,
          lastName: userData.user?.lastName,
          creditedFreeTipsCount: userData.creditedFreeTipsCount,
          creditedPaidTipsCount: userData.creditedPaidTipsCount,
        })),
      ),
    [result],
  );

  console.log(formattedData, "formattedData");

  const table = useReactTable({
    columns,
    data: formattedData ?? [],

    enableGrouping: true,
    enableRowActions: false,
    getGroupedRowModel: getGroupedRowModel(),
    state: { grouping, expanded, isLoading: historiesQuery.isPending },
    onExpandedChange: (updater) => {
      const newExpanded =
        typeof updater === "function" ? updater(expanded) : updater;

      const newlyExpandedRow = Object.keys(newExpanded).find(
        //@ts-expect-error @ts-expect-error
        (rowId) => newExpanded[rowId] && !expanded[rowId],
      );

      if (newlyExpandedRow) {
        const row = table.getRow(newlyExpandedRow);
        setSelectedDate({
          startDate: dayjs(row.original.startDate).startOf("month").toDate(),
          endDate: dayjs(row.original.startDate).endOf("month").toDate(),
        });

        setAggregateCase("aggregateByUser");
        console.log("Последняя развернутая строка:", row);

        if (row.original.userId) {
          setSelectedUserId(row.original.userId);
        }
      }
      setExpanded(newExpanded);
    },
  });

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title size="h1" className="mb-6">
            {t("history")}
          </Title>
          <Button onClick={debitAllTips.debitAllTips}>
            {t("debit_all_tips")}
          </Button>
        </div>
        <MantineReactTable table={table} />
      </div>
      {debitAllTips.modal}
      {updateUserBalance.modal}
    </>
  );
};
