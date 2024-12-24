import { useUpdateUser } from "./use-update-user";

export const useVerifyUser = () => {
  const mutation = useUpdateUser();

  const handleVerifyUser = async (id: number, value: boolean) => {
    await mutation.mutateAsync(
      { id, isVerified: value },
      {
        onSuccess: () => {
          //toast.success(t("the_user_has_been_successfully_verify"));
        },
        onError: () => {
          //toast.error(t("couldn't_hide_the_user"));
        },
      },
    );
  };

  return { handleVerifyUser, isLoading: mutation.isPending };
};
