import { useQuery } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";

export const useGetPermissions = () => {
  const { getPermissions } = useAccessClient();

  return useQuery({
    queryKey: [QUERY_KEYS.PERMISSIONS],
    queryFn: async () => {
      const response = await getPermissions({});

      return response;
    },
  });
};
