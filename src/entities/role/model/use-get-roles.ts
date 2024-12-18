import { useQuery } from "@tanstack/react-query";
import { useRolesClient } from "@/shared/grpc/clients/use-role-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";

export const useGetRoles = () => {
  const { getAllRoles } = useRolesClient();

  return useQuery({
    queryKey: [QUERY_KEYS.ROLES],
    queryFn: async () => {
      const response = await getAllRoles({});

      return response;
    },
    select: (data) => {
      return data.roles.map((c) => ({
        value: c.id.toString(),
        label: c.value,
      }));
    },
  });
};
