"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import {
  GetAllUsersRequest,
  GetAllUsersResponse,
} from "@/shared/proto/user/v1/user";

export const useGetUsers = (req: GetAllUsersRequest) => {
  const { getAllUsers } = useUsersClient();

  return useQuery<GetAllUsersResponse>({
    queryKey: [QUERY_KEYS.USERS, req],
    queryFn: async ({ signal }) => {
      const response = await getAllUsers(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
  });
};
