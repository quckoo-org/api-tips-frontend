import { useQuery } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";

export const useGetRoles = () => {
  const { getRoles } = useAccessClient();

  return useQuery({
    queryKey: [QUERY_KEYS.ROLES],
    queryFn: async () => {
      const response = await getRoles({});

      return response;
    },
  });
};
