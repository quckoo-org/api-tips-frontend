import { useQuery } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";

export const useGetMethods = () => {
  const { getMethods } = useAccessClient();

  return useQuery({
    queryKey: [QUERY_KEYS.METHODS],
    queryFn: async () => {
      const response = await getMethods({});

      return response;
    },
  });
};
