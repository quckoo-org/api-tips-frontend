"use client";

import { Button, TextInput } from "@mantine/core";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";
import { LoginByEmailReqT } from "../model/types";
import { useLoginByEmail } from "../model/use-login-by-email";

type LoginByEmailProps = {
  className?: string;
};

export const LoginByEmailForm: FC<LoginByEmailProps> = () => {
  const { t } = useTranslations();
  const loginMutation = useLoginByEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginByEmailReqT>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (req: LoginByEmailReqT) => {
    loginMutation.mutateAsync(req);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-md mx-auto p-4"
    >
      <h1 className="text-2xl mb-4">{t("Login")}</h1>
      {!!loginMutation.error && (
        <p className="text-red-500">
          {loginMutation.error.response?.data.message}
        </p>
      )}
      <TextInput
        label={t("email")}
        placeholder={t("enter_email")}
        {...register("email", { required: t("email_is_required") })}
        error={errors.email?.message}
      />
      <TextInput
        label={t("password")}
        placeholder={t("password")}
        {...register("password", { required: t("password_is_required") })}
        error={errors.password?.message}
      />
      <Button
        loading={loginMutation.isPending}
        type="submit"
        className="p-2 mt-4  text-white"
      >
        {t("Login")}
      </Button>
    </form>
  );
};
