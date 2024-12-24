import { useQuery } from "@tanstack/react-query";
import { useUsersClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";

export const useGetCurrentUser = () => {
  const { getCurrentUser } = useUsersClient();

  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: async ({ signal }) => {
      const response = await getCurrentUser({}, { signal });

      return response;
    },
  });
};
