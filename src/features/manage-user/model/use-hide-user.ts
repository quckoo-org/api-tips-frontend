import toast from "react-hot-toast";
import { useTranslations } from "@/shared/locale/translations";
import { useUpdateUser } from "./use-update-user";

export const useHideUser = () => {
  const mutation = useUpdateUser();
  const { t } = useTranslations();

  const handleHideUser = async (id: number, value: boolean) => {
    await mutation.mutateAsync(
      { id, isDeleted: value },
      {
        onSuccess: () => {
          toast.success(t("the_user_has_been_successfully_hide"));
        },
        onError: () => {
          toast.error(t("couldn't_hide_the_user"));
        },
      },
    );
  };

  return { handleHideUser, isLoading: mutation.isPending };
};
