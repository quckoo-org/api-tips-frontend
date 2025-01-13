import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTariffsClient } from "@/shared/grpc/clients/use-tariffs-client";
import { QUERY_KEYS } from "@/shared/lib/query-keys";

export const useUpdateTariff = () => {
  const { updateTariff } = useTariffsClient();
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, unknown>({
    mutationFn: async (req) => {
      const response = await updateTariff(req);

      return response;
    },
    onSuccess: () => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.TARIFFS] },
        (oldData: unknown | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            // rows: oldData.rows.map((tariff) =>
            //   tariff.id === tariffResponse?.tariff?.id
            //     ? tariffResponse?.tariff
            //     : tariff,
            // ),
          };
        },
      );
    },
  });
};
