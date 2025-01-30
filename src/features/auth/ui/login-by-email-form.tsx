"use client";

import { Anchor, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { sha256 } from "js-sha256";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES } from "@/shared/router";
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
    const { password, ...resReq } = req;
    const hashedPassword = sha256(password);
    const finalRequest: LoginByEmailReqT = {
      password: hashedPassword,
      ...resReq,
    };
    loginMutation.mutateAsync(finalRequest);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-md mx-auto p-4"
    >
      <h1 className="text-2xl mb-4">{t("Login")}</h1>
      <TextInput
        label={t("email")}
        placeholder={t("enter_email")}
        {...register("email", { required: t("email_is_required") })}
        error={errors.email?.message}
      />
      <PasswordInput
        label={
          <div className="flex justify-between w-full">
            <span>{t("password")}</span>
            <Anchor href={ROUTES.FORGOT_PASSWORD} size="2xs">
              Forgot?
            </Anchor>
          </div>
        }
        placeholder={t("enter_password")}
        {...register("password", { required: t("password_is_required") })}
        error={errors.password?.message}
        labelProps={{ className: "w-full" }}
      />
      {!!loginMutation.error && (
        <Text className="text-red-500 mt-2" size="2xs">
          {loginMutation.error.response?.data.Message}
        </Text>
      )}
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
