"use client";

import { Button, Modal, PasswordInput } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useGetCurrentUser } from "@/entities/user";
import { UpdatePasswordFormValuesT } from "@/features/auth/model/types";
import { TokenService } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { ChangeUserPasswordRequest } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { ROUTES } from "@/shared/router";
import { useUpdatePassword } from "../model/use-update-password";
import { useGetPasswordValidationRules } from "../model/utils";

type UpdatePasswordModalProps = {
  className?: string;
  onClose: () => void;
};

export const UpdatePasswordModal: FC<UpdatePasswordModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const passwordValidationRules = useGetPasswordValidationRules();
  const currentUser = useGetCurrentUser(TokenService.getAccessToken());
  const updatePasswordMutation = useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormValuesT>({
    defaultValues: { newPassword: "", oldPassword: "" },
  });

  const onUpdatePassword = async (data: UpdatePasswordFormValuesT) => {
    if (!currentUser) return;

    const updateUserRequest: ChangeUserPasswordRequest = {
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
      email: currentUser.email,
    };

    await updatePasswordMutation.mutateAsync(updateUserRequest);
    onClose();
  };

  return (
    <Modal
      className={clsx("", className)}
      withinPortal
      title={t("update_password")}
      onClose={onClose}
      opened={true}
    >
      <form
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit(onUpdatePassword)}
      >
        <PasswordInput
          label={
            <div className="flex justify-between w-full">
              <span>{t("current_password")}</span>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary-600 font-normal"
              >
                {t("forgot")}?
              </Link>
            </div>
          }
          placeholder={t("Password")}
          {...register("oldPassword", {
            required: t("password_is_required"),
          })}
          labelProps={{ className: "w-full" }}
          error={errors.oldPassword?.message}
        />
        <PasswordInput
          label={t("new_password")}
          placeholder={t("6_characters")}
          {...register("newPassword", {
            required: t("password_is_required"),
            ...passwordValidationRules,
          })}
          error={errors.newPassword?.message}
        />
        <Button
          disabled={updatePasswordMutation.isPending}
          loading={updatePasswordMutation.isPending}
          radius="lg"
          color="dark"
          type="submit"
          className="w-full mt-2.5"
        >
          {t("update_password")}
        </Button>
      </form>
    </Modal>
  );
};
