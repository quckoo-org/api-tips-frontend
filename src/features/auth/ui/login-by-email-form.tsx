"use client";

import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Card,
} from "@mantine/core";
import { sha256 } from "js-sha256";
import Link from "next/link";
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

  // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
  // box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.1);
  // box-shadow: 0px 7px 7px -5px rgba(0, 0, 0, 0.04);

  return (
    <Card
      component="form"
      shadow="sm"
      radius="lg"
      padding="xl"
      className="bg-white border border-gray-300 w-full flex flex-col gap-y-4 max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title size="h3">
        {t("play_smarter")} <br />{" "}
        <span className="text-gray-600">{t("login_to_your_account")}</span>
      </Title>
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
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-sm text-primary-600 font-normal"
            >
              {t("forgot")}?
            </Link>
          </div>
        }
        placeholder={t("enter_password")}
        {...register("password", { required: t("password_is_required") })}
        error={errors.password?.message}
        labelProps={{ className: "w-full" }}
      />
      {!!loginMutation.error && (
        <Text className="text-red-500 mt-2">
          {loginMutation.error.response?.data.Message}
        </Text>
      )}
      <Button
        loading={loginMutation.isPending}
        type="submit"
        variant="filled"
        color="dark"
        radius="lg"
      >
        {t("continue")}
      </Button>
      <Text>
        {t("don't_have_an_account")}{" "}
        <Link className="text-primary-600" href={ROUTES.REGISTER}>
          {t("sign_up")}
        </Link>
      </Text>
    </Card>
  );
};
