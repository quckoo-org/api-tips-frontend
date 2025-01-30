"use client";
import { Button, Card, PasswordInput, Text } from "@mantine/core";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ChangePasswordFormValuesT,
  ChangePasswordReqT,
} from "@/features/auth/model/types";
import { useChangePassword } from "@/features/auth/model/use-change-password";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";

type ResetFormProps = {
  email: string;
  code: string;
  className?: string;
};
export const ResetForm: FC<ResetFormProps> = ({ className, code, email }) => {
  const { t } = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValuesT>();
  const router = useRouter();
  const changePasswordQuery = useChangePassword();

  const onSubmit = (data: ChangePasswordFormValuesT) => {
    const changePasswordRequest: ChangePasswordReqT = {
      email,
      code,
      password: data.password,
    };
    changePasswordQuery.mutate(changePasswordRequest, {
      onSuccess: () => {
        toast.success(t("password_reset_success"), {
          duration: 4000,
        });
        authStore.logout();
        router.push(ROUTES.LOGIN);
      },
      onError: (error) => {
        toast.error(error.response?.data.Message || t("password_reset_failed"));
      },
    });
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center min-h-screen bg-gray-50 p-4",
        className,
      )}
    >
      <div className="max-w-md w-full">
        <Card shadow="md" radius="md" padding="lg" className="bg-white">
          <Text className="text-xl font-bold mb-4">
            {t("reset_password_title")}
          </Text>
          <Text className="text-gray-600 text-sm mb-6">
            {t("reset_password_subtitle")}
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <PasswordInput
                label="New Password"
                placeholder="Enter your new password"
                {...register("password", {
                  required: t("password_required"),
                  minLength: {
                    value: 8,
                    message: t("password_must_be_more_then_8_characters_long"),
                  },
                })}
                error={errors.password?.message}
              />
            </div>
            <Button
              fullWidth
              variant="filled"
              color="dark"
              className="text-white"
              type="submit"
              loading={changePasswordQuery.isPending}
            >
              {t("reset_password")}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
