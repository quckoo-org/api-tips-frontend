"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetUsersRequest,
  GetUsersRequest_Filter,
  GetUsersResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useGetUsers = (
  req: Partial<GetUsersRequest_Filter> | undefined,
) => {
  const { getUsers } = useAccessClient();

  return useQuery<GetUsersResponse>({
    queryKey: [QUERY_KEYS.USERS, req],
    queryFn: async ({ signal }) => {
      const response = await getUsers({ filter: req } as GetUsersRequest, {
        signal,
      });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
