import { useQuery } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import { GetUserRequest } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useGetUser = (req: Partial<GetUserRequest>) => {
  const { getUser } = useAccessClient();

  return useQuery({
    queryKey: [QUERY_KEYS.USER, req],
    enabled: !!req.userId,
    queryFn: async ({ signal }) => {
      const response = await getUser(req, { signal });

      return response;
    },
  });
};
