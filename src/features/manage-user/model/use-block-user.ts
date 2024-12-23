import { useUpdateUser } from "./use-update-user";

export const useBlockUser = () => {
  const mutation = useUpdateUser();

  const handleBlockUser = async (id: number, value: boolean) => {
    await mutation.mutateAsync(
      { id, isBlocked: value },
      {
        onSuccess: () => {
          //toast.success(t("the_user_has_been_successfully_block"));
        },
        onError: () => {
          //toast.error(t("couldn't_hide_the_user"));
        },
      },
    );
  };

  return { handleBlockUser, isLoading: mutation.isPending };
};
