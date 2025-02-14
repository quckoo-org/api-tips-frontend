"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetUserDetailedRequest,
  GetUserDetailedResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useGetDetailedUsers = (
  req?: Partial<GetUserDetailedRequest> | undefined,
) => {
  const { getUserDetailed } = useAccessClient();

  return useQuery<GetUserDetailedResponse>({
    queryKey: [QUERY_KEYS.DETAILED_USER, req],
    queryFn: async ({ signal }) => {
      const response = await getUserDetailed(
        {},
        {
          signal,
        },
      );

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
