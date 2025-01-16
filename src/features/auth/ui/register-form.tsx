"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { CountrySelect } from "@/entities/country";
import { useTranslations } from "@/shared/locale/translations";
import { RegisterReqT } from "../model/types";
import { useRegisterUser } from "../model/use-register-user";

type RegisterFormProps = {
  className?: string;
};

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
  const { t } = useTranslations();
  const registerMutation = useRegisterUser();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterReqT>({
    defaultValues: { email: "", firstname: "", lastname: "", password: "" },
  });

  const onSubmit = async (req: RegisterReqT) => {
    registerMutation.mutateAsync(req);
  };

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("flex flex-col max-w-md mx-auto p-4", className)}
    >
      <form>
        <h1 className="text-2xl mb-4">{t("Register")}</h1>
        {!!registerMutation.error && (
          <p className="text-red-500">
            {registerMutation.error?.response?.data.message}
          </p>
        )}
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
          {...register("password", { required: t("password_is_required") })}
          error={errors.password?.message}
        />
        <TextInput
          label={t("first_name")}
          placeholder={t("first_name")}
          {...register("firstname", { required: t("firstName_is_required") })}
          error={errors.firstname?.message}
        />
        <TextInput
          label={t("last_name")}
          placeholder={t("last_name")}
          {...register("lastname", { required: t("lastName_is_required") })}
          error={errors.lastname?.message}
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
          disabled={registerMutation.isPending}
          loading={registerMutation.isPending}
          type="submit"
          className="p-2 mt-4 w-full  text-white"
        >
          {t("Register")}
        </Button>
      </form>
    </div>
  );
};
