"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import {
  ListUsersRequest,
  ListUsersResponse,
} from "@/shared/proto/user/v1/user";

export const useGetUsers = (req: ListUsersRequest) => {
  const { getAllUsers } = useUsersClient();

  return useQuery<ListUsersResponse>({
    queryKey: [QUERY_KEYS.USERS, req],
    queryFn: async ({ signal }) => {
      const response = await getAllUsers(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
