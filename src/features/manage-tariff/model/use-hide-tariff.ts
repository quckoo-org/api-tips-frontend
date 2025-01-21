import { useUpdateTariff } from "./use-update-tariff";

export const useHideTariff = () => {
  const mutation = useUpdateTariff();

  const handleHideTariff = async (id: number, value: boolean) => {
    await mutation.mutateAsync(
      { tariffId: id, isHidden: value },
      {
        onSuccess: () => {
          // toast.success(t("the_tariff_has_been_successfully_hide"));
        },
        onError: () => {
          //toast.error(t("couldn't_hide_the_tariff"));
        },
      },
    );
  };

  return { handleHideTariff, isLoading: mutation.isPending };
};
