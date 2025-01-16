import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTariffsClient } from "@/shared/grpc/clients/use-tariffs-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetTariffsResponse,
  UpdateTariffRequest,
} from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";

export const useUpdateTariff = () => {
  const { updateTariff } = useTariffsClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: UpdateTariffRequest) => {
      const response = await updateTariff(req);

      return response;
    },
    onSuccess: (tariffResponse) => {
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEYS.TARIFFS] },
        (oldData: GetTariffsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            tariffs: oldData.tariffs.map((tariff) =>
              tariff.id === tariffResponse?.tariff?.id
                ? tariffResponse?.tariff
                : tariff,
            ),
          };
        },
      );
    },
  });
};
