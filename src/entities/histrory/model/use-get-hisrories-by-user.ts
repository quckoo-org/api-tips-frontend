import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useHistoryClient } from "@/shared/grpc/clients/use-history-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetHistoriesByUserRequest,
  GetHistoriesByUserResponse,
} from "@/shared/proto/api_tips_balance/v1/api_tips_balance";

export const useGetHistoriesByUser = (req: GetHistoriesByUserRequest) => {
  console.log(req, "by_user_req");
  const { getHistoriesByUser } = useHistoryClient();

  return useQuery<GetHistoriesByUserResponse>({
    queryKey: [QUERY_KEYS.HISTORIES_BY_USER],
    queryFn: async ({ signal }) => {
      const response = await getHistoriesByUser(req, { signal });

      return response;
    },
    placeholderData: keepPreviousData,
    enabled: !!req.userId,
  });
};
