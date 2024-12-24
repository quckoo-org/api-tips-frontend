import { useQuery } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";
import { TokenService } from "@/shared/lib/tokenService";

export const useGetCurrentUser = () => {
  const { getCurrentUser } = useUsersClient();
  const accessToken = TokenService.getAccessToken();
  console.log(accessToken, 'acc1');
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: async ({ signal }) => {
      const response = await getCurrentUser({}, { signal });

      return response;
    },
    enabled: !!accessToken,
  });
};
