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
  GetDetailedHistoriesRequest,
  GetDetailedHistoriesResponse,
  GetHistoriesRequest,
  GetHistoriesResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useGetHistories = (req: GetHistoriesRequest) => {
  const { getHistories } = useHistoryClient();
  return useQuery<GetHistoriesResponse>({
    queryKey: [QUERY_KEYS.HISTORIES, req],
    queryFn: async ({ signal }) => {
      const response = await getHistories(req, { signal });
      return response;
    },

    enabled: !!req.endDate && !!req.startDate,
    placeholderData: keepPreviousData,
  });
};

export const useGetDetailedHistories = (req: GetDetailedHistoriesRequest) => {
  const queryClient = useQueryClient();
  const { getDetailedHistories } = useHistoryClient();
  const detailedHistoryQuery = useQuery<GetDetailedHistoriesResponse>({
    queryKey: [QUERY_KEYS.DETAILED_HISTORIES, req],
    queryFn: async ({ signal }) => {
      const response = await getDetailedHistories(req, { signal });

      return response;
    },
    enabled: req.userIds.length > 0,
  });

  useEffect(() => {
    if (detailedHistoryQuery.isSuccess) {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.HISTORIES] },
        (oldData: GetHistoriesResponse | undefined) => {
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
