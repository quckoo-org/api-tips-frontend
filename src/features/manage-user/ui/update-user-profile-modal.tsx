import { Button, Modal, TextInput } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { CountrySelect } from "@/entities/country";
import { useGetDetailedUsers } from "@/entities/user";
import { useTranslations } from "@/shared/locale/translations";
import { User } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { UserProfileFormValuesT } from "../model/types";
import { useUpdateUserProfile } from "../model/use-update-profile";

type UpdateUserProfileModalProps = {
  className?: string;
  onClose: (user?: User) => void;
};

export const UpdateUserProfileModal: FC<UpdateUserProfileModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const detailedUserQuery = useGetDetailedUsers();
  const updateProfileMutation = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserProfileFormValuesT>({
    defaultValues: {
      firstName: "",
      lastName: "",
      cca3: "",
    },
    values: {
      firstName: detailedUserQuery.data?.detailedUser?.user?.firstName ?? "",
      lastName: detailedUserQuery.data?.detailedUser?.user?.lastName ?? "",
      cca3: (detailedUserQuery.data?.detailedUser?.user?.cca3 as string) ?? "",
    },
  });

  const onUpdateUserProfile = async (req: UserProfileFormValuesT) => {
    const userResponse = await updateProfileMutation.mutateAsync(req);
    onClose(userResponse.user);
  };

  return (
    <Modal
      className={clsx("", className)}
      withinPortal
      title={t("update_account_details")}
      onClose={onClose}
      opened={true}
    >
      <form
        onSubmit={handleSubmit(onUpdateUserProfile)}
        className="flex flex-col gap-y-4"
      >
        <TextInput
          label={t("first_name")}
          placeholder={t("enter_first_name")}
          {...register("firstName", { required: t("first_name_is_required") })}
          error={errors.firstName?.message}
        />
        <TextInput
          label={t("last_name")}
          placeholder={t("enter_last_name")}
          {...register("lastName", { required: t("last_name_is_required") })}
          error={errors.lastName?.message}
        />
        <Controller
          name="cca3"
          control={control}
          rules={{ required: t("country_is_required") }}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChangeCountry={field.onChange}
              error={errors.cca3?.message}
            />
          )}
        />
        <Button
          loading={updateProfileMutation.isPending}
          disabled={updateProfileMutation.isPending}
          type="submit"
        >
          {t("submit")}
        </Button>
      </form>
    </Modal>
  );
};
