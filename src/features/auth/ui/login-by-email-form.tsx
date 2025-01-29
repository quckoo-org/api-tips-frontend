"use client";

import { Button, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { sha256 } from "js-sha256";
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
    const { password, ...resReq } = req;
    const hashedPassword = sha256(password);
    const finalRequest: LoginByEmailReqT = {
      password: hashedPassword,
      ...resReq,
    };
    loginMutation.mutateAsync(finalRequest);
  };

  // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
  // box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.1);
  // box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, 0.04);

  return (
    <Paper
      component="form"
      radius="lg"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col max-w-md p-8 shadow border border-gray-300"
    >
      <Title size="h3" className="mb-4">
        {t("play_smarter")} <br />{" "}
        <span className="text-gray-600">{t("login_to_your_account")}</span>
      </Title>
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
      <PasswordInput
        label={t("password")}
        placeholder={t("enter_password")}
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
    </Paper>
  );
};
