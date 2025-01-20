import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTariffsClient } from "@/shared/grpc/clients/use-tariffs-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  AddTariffRequest,
  GetTariffsResponse,
  Tariff,
} from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";

export const useCreateTariff = () => {
  const { addTariff } = useTariffsClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: AddTariffRequest) => {
      const response = await addTariff(req);

      return response;
    },
    onSuccess: (tariffResponse) => {
      queryClient.setQueriesData<GetTariffsResponse>(
        { queryKey: [QUERY_KEYS.TARIFFS] },
        (oldData) => {
          if (!oldData) return undefined;

          return {
            ...oldData,
            tariffs: [...oldData.tariffs, tariffResponse.tariff].filter(
              (tariff): tariff is Tariff => tariff !== undefined,
            ),
          };
        },
      );
    },
  });
};
