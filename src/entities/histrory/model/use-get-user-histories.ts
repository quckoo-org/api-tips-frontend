"use client";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import { dayjs, QUERY_KEYS } from "@/shared/lib";
import {
  GetDetailedHistoriesByUserRequest,
  GetDetailedHistoriesByUserResponse,
  GetHistoriesByUserRequest,
  GetHistoriesByUserResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useGetUserHistories = (req: GetHistoriesByUserRequest) => {
  const { getHistoriesByUser } = useHistoryClient();
  return useQuery<GetHistoriesByUserResponse>({
    queryKey: [QUERY_KEYS.HISTORIES, req],
    queryFn: async ({ signal }) => {
      const response = await getHistoriesByUser(req, { signal });
      return response;
    },

    enabled: !!req.endDate && !!req.startDate,
    placeholderData: keepPreviousData,
  });
};

export const useGetDetailedHistoriesByUser = (
  req: GetDetailedHistoriesByUserRequest,
) => {
  const queryClient = useQueryClient();
  const { getDetailedHistoriesByUser } = useHistoryClient();
  const detailedHistoryQuery = useQuery<GetDetailedHistoriesByUserResponse>({
    queryKey: [QUERY_KEYS.DETAILED_HISTORIES, req],
    queryFn: async ({ signal }) => {
      const response = await getDetailedHistoriesByUser(req, { signal });

      return response;
    },
  });

  useEffect(() => {
    if (detailedHistoryQuery.isSuccess) {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.HISTORIES] },
        (oldData: GetHistoriesByUserResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            years: oldData.years.map((year) => {
              return {
                ...year,
                months: year.months.map((month) => {
                  if (
                    detailedHistoryQuery.data.month &&
                    dayjs(month.date).isSame(
                      detailedHistoryQuery.data.month.date,
                    )
                  ) {
                    return detailedHistoryQuery.data.month;
                  }

                  return month;
                }),
              };
            }),
          };
        },
      );
    }
  }, [detailedHistoryQuery.data, detailedHistoryQuery.isSuccess]);

  return detailedHistoryQuery;
};
