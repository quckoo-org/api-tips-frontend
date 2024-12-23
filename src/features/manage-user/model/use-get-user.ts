import { useQuery } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import {  GetUserRequest } from "@/shared/proto/user/v1/user";

export const useGetUser = (req: Partial<GetUserRequest>) => {
  const { getUser } = useUsersClient();

  return useQuery({
    queryKey: [QUERY_KEYS.USER, req],
    enabled: !!req.userId,
    queryFn: async ({ signal }) => {
      const response = await getUser(req, { signal });

      return response;
    },
  });
}