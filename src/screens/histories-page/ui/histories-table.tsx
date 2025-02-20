"use client";

import {
  Box,
  LoadingOverlay,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";
import { useGetHistories } from "@/entities/histrory";
import { useGetDetailedHistories } from "@/entities/histrory/model/use-get-histories";
import { dayjs } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { User } from "@/shared/proto/api_tips_balance/v1/api_tips_balance";
import { BalanceOperationType } from "@/shared/proto/custom_enums/v1/custom_enums";

export type HistoriesTableProps = {
  dates: Date[];
  updateUserBalance: (userId: number) => void;
};

export const HistoriesTable: React.FC<HistoriesTableProps> = ({
  updateUserBalance,
  dates,
}) => {
  const { t } = useTranslations();
  const [selectedYear, setSelectedYear] = useState<Date | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const [openedYears, setOpenedYears] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [openedMonths, setOpenedMonths] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [openedUsers, setOpenedUsers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [openedDays, setOpenedDays] = useState<{ [key: string]: boolean }>({});

  const historiesQuery = useGetHistories({
    startDate: dates[0],
    endDate: dates[1],
  });
  const historiesDetailedQuery = useGetDetailedHistories({
    date: selectedYear,
    userIds: selectedUsers,
  });

  const toggleYear = (year?: string) => {
    if (!year) return;

    setOpenedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleMonth = (year: Date, month: Date, users: User[]) => {
    setSelectedYear(month);
    setSelectedUsers(users.map((user) => user.id));
    const _year = formatDateToString(year);
    const _month = formatDateToString(month);
    setOpenedMonths((prev) => ({
      ...prev,
      [`${_year}-${_month}`]: !prev[`${_year}-${_month}`],
    }));
  };

  const toggleUser = (month: Date, user: number) => {
    const _month = formatDateToString(month);
    setOpenedUsers((prev) => ({
      ...prev,
      [`${_month}-${user}`]: !prev[`${_month}-${user}`],
    }));
  };

  const toggleDay = (day: string) => {
    setOpenedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const formatDateToString = (year?: Date) => {
    return dayjs(year).toISOString();
  };

  const operationTypeLabel: Record<BalanceOperationType, string> = {
    [BalanceOperationType.BALANCE_OPERATION_TYPE_DEBITING]: t("debiting"),
    [BalanceOperationType.BALANCE_OPERATION_TYPE_CREDITING]: t("crediting"),
    [BalanceOperationType.BALANCE_OPERATION_TYPE_UNSPECIFIED]: t("unspecified"),
    [BalanceOperationType.UNRECOGNIZED]: t("recovered"),
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={historiesQuery.isLoading || historiesDetailedQuery.isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>{t("period")}</Table.Th>
            <Table.Th>{t("full_name")}</Table.Th>
            <Table.Th>{t("email")}</Table.Th>
            <Table.Th>{t("balance")}</Table.Th>
            <Table.Th>{t("free_tips")}</Table.Th>
            <Table.Th>{t("paid_tips")}</Table.Th>
            <Table.Th>{t("debited_tips")}</Table.Th>
            <Table.Th>{t("operation_type")}</Table.Th>
            <Table.Th>{t("reason")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {historiesQuery.data?.years.map((year) => (
            <React.Fragment key={formatDateToString(year.date)}>
              <Table.Tr className="bg-gray-200">
                <Table.Td>
                  <div
                    onClick={() => toggleYear(formatDateToString(year.date))}
                  >
                    {openedYears[formatDateToString(year.date)] ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )}
                  </div>
                </Table.Td>
                <Table.Td>
                  <Text className="text-sm font-bold">
                    {dayjs(year.date).format("YYYY")}
                  </Text>
                </Table.Td>
                <Table.Td />
                <Table.Td />
                <Table.Td />
                <Table.Td>
                  <Text className="text-sm text-green-500">
                    {year.creditedFreeTipsCount}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className="text-sm text-green-500">
                    {year.creditedPaidTipsCount}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text className="text-sm text-red-500">
                    {year.debitedTipsCount}
                  </Text>
                </Table.Td>
                <Table.Td />
                <Table.Td />
              </Table.Tr>
              {openedYears[formatDateToString(year.date)] &&
                year.months.map((month) => {
                  return (
                    <React.Fragment key={formatDateToString(month.date)}>
                      <Table.Tr>
                        <Table.Td>
                          <div
                            onClick={() =>
                              toggleMonth(year.date!, month.date!, month.users)
                            }
                          >
                            {openedMonths[
                              `${formatDateToString(year.date)}-${formatDateToString(month.date)}`
                            ] ? (
                              <ChevronUpIcon />
                            ) : (
                              <ChevronDownIcon />
                            )}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <Text className="text-sm font-bold">
                            {dayjs(month.date).format("MMMM YYYY")}
                          </Text>
                        </Table.Td>
                        <Table.Td />
                        <Table.Td />
                        <Table.Td />
                        <Table.Td>
                          <Text className="text-sm text-green-500">
                            {month.creditedFreeTipsCount}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text className="text-sm text-green-500">
                            {month.creditedPaidTipsCount}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text className="text-sm text-red-500">
                            {month.debitedTipsCount}
                          </Text>
                        </Table.Td>
                        <Table.Td />
                        <Table.Td />
                      </Table.Tr>
                      {openedMonths[
                        `${formatDateToString(year.date)}-${formatDateToString(month.date)}`
                      ] &&
                        month.users.map((user) => (
                          <React.Fragment key={user.id}>
                            <Table.Tr className="bg-gray-50">
                              <Table.Td>
                                <div
                                  onClick={() =>
                                    toggleUser(month.date!, user.id)
                                  }
                                >
                                  {openedUsers[
                                    `${formatDateToString(month.date)}-${user.id}`
                                  ] ? (
                                    <ChevronUpIcon />
                                  ) : (
                                    <ChevronDownIcon />
                                  )}
                                </div>
                              </Table.Td>
                              <Table.Td />
                              <Table.Td>
                                <UnstyledButton
                                  onClick={() => updateUserBalance(user.id)}
                                >
                                  <Text className="text-sm font-bold cursor-pointer  hover:text-primary-600 hover:underline">
                                    {`${user.firstName} ${user.lastName}`}
                                  </Text>
                                </UnstyledButton>
                              </Table.Td>
                              <Table.Td>{user.email}</Table.Td>
                              <Table.Td />
                              <Table.Td>
                                <Text className="text-sm text-green-500">
                                  {user.creditedFreeTipsCount}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Text className="text-sm text-green-500">
                                  {user.creditedPaidTipsCount}
                                </Text>
                              </Table.Td>
                              <Table.Td>
                                <Text className="text-sm text-green-500">
                                  {user.debitedTipsCount}
                                </Text>
                              </Table.Td>
                              <Table.Td />
                              <Table.Td />
                            </Table.Tr>
                            {openedUsers[
                              `${formatDateToString(month.date)}-${user.id}`
                            ] &&
                              user.days.map((day) => (
                                <React.Fragment
                                  key={formatDateToString(day.date)}
                                >
                                  <Table.Tr>
                                    <Table.Td>
                                      <div
                                        onClick={() =>
                                          toggleDay(
                                            formatDateToString(day.date),
                                          )
                                        }
                                      >
                                        {openedDays[
                                          formatDateToString(day.date)
                                        ] ? (
                                          <ChevronUpIcon />
                                        ) : (
                                          <ChevronDownIcon />
                                        )}
                                      </div>
                                    </Table.Td>
                                    <Table.Td>
                                      <Text className="text-sm font-bold">
                                        {dayjs(day.date).format("DD MMM YYYY")}
                                      </Text>
                                    </Table.Td>
                                    <Table.Td />
                                    <Table.Td />
                                    <Table.Td />
                                    <Table.Td>
                                      <Text className="text-sm text-green-500">
                                        {day.creditedFreeTipsCount}
                                      </Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Text className="text-sm text-green-500">
                                        {day.creditedPaidTipsCount}
                                      </Text>
                                    </Table.Td>
                                    <Table.Td>
                                      <Text className="text-sm text-red-500">
                                        {day.debitedTipsCount}
                                      </Text>
                                    </Table.Td>
                                    <Table.Td />
                                    <Table.Td />
                                  </Table.Tr>
                                  {openedDays[formatDateToString(day.date)] &&
                                    day.operations.map((operation) => (
                                      <Table.Tr key={operation.id}>
                                        <Table.Td />
                                        <Table.Td>
                                          {dayjs(
                                            operation.operationDate,
                                          ).format("mm:ss DD.MM.YYYY")}
                                        </Table.Td>
                                        <Table.Td />
                                        <Table.Td />
                                        <Table.Td>
                                          {operation.totalTipsBalance}
                                        </Table.Td>
                                        <Table.Td>
                                          <Text className="text-sm text-green-500">
                                            {operation.creditedFreeTipsCount}
                                          </Text>
                                        </Table.Td>
                                        <Table.Td>
                                          <Text className="text-sm text-green-500">
                                            {operation.creditedPaidTipsCount}
                                          </Text>
                                        </Table.Td>
                                        <Table.Td>
                                          <Text className="text-sm text-red-500">
                                            {" "}
                                            {operation.debitedTipsCount}
                                          </Text>
                                        </Table.Td>
                                        <Table.Td>
                                          {
                                            operationTypeLabel[
                                              operation.operationType
                                            ]
                                          }
                                        </Table.Td>
                                        <Table.Td>{operation.reason}</Table.Td>
                                      </Table.Tr>
                                    ))}
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
