"use client";

import {
  Button,
  Card,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { CountrySelect } from "@/entities/country";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES } from "@/shared/router";
import { RegisterReqT } from "../model/types";
import { useRegisterUser } from "../model/use-register-user";
import { useGetPasswordValidationRules } from "../model/utils";

type RegisterFormProps = {
  className?: string;
};

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
  const { t } = useTranslations();
  const registerMutation = useRegisterUser();
  const passwordRules = useGetPasswordValidationRules();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterReqT>({
    defaultValues: { email: "", firstname: "", lastname: "", password: "" },
  });

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = async (req: RegisterReqT) => {
    if (validateCaptcha(req.captcha)) {
      registerMutation.mutateAsync(req);
      return;
    }
    setError("captcha", { message: t("invalid_captcha") });
    loadCaptchaEnginge(6);
  };

  return (
    <Card
      component="form"
      shadow="sm"
      radius="lg"
      padding="xl"
      className={clsx(
        "bg-white border border-gray-300 w-full flex flex-col gap-y-4 max-w-md",
        className,
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title size="h3">{t("Register")}</Title>
      <div className="flex gap-x-4">
        <TextInput
          className="basis-1/2"
          label={t("first_name")}
          placeholder={t("first_name")}
          {...register("firstname", {
            required: t("firstName_is_required"),
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: t("first_name_must_consist_of_latin_letters"),
            },
          })}
          error={errors.firstname?.message}
        />
        <TextInput
          className="basis-1/2"
          label={t("last_name")}
          placeholder={t("last_name")}
          {...register("lastname", {
            required: t("lastName_is_required"),
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: t("last_name_must_consist_of_latin_letters"),
            },
          })}
          error={errors.lastname?.message}
        />
      </div>
      <TextInput
        label={t("email")}
        placeholder={t("enter_email")}
        {...register("email", {
          required: t("email_is_required"),
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: t("invalid_email"), // Сообщение об ошибке для некорректного email
          },
        })}
        error={errors.email?.message}
      />
      <PasswordInput
        label={t("Password")}
        placeholder={t("Password")}
        {...register("password", {
          required: t("password_is_required"),
          ...passwordRules,
        })}
        error={errors.password?.message}
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
      <div className={"[&_a]:text-sm"}>
        <LoadCanvasTemplate />
        <TextInput
          className="basis-1/2"
          placeholder={t("enter_captcha")}
          {...register("captcha", {
            required: t("captcha_is_required"),
          })}
          error={errors.captcha?.message}
        />
      </div>
      {!!registerMutation.error && (
        <Text className="text-red-500 mt-2" size="2xs">
          {registerMutation.error?.response?.data.Message}
        </Text>
      )}
      <Button
        disabled={registerMutation.isPending}
        loading={registerMutation.isPending}
        radius="lg"
        color="dark"
        type="submit"
        className="w-full "
      >
        {t("create")}
      </Button>
      <Text>
        {t("already_have_an_account")}{" "}
        <Link className="text-primary-600" href={ROUTES.LOGIN}>
          {t("log_in")}
        </Link>
      </Text>
    </Card>
  );
};
