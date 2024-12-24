"use client";

import { Button, TextInput } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useForm } from "react-hook-form";
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterReqT>({
    defaultValues: { email: "", firstName: "", lastName: "", password: "" },
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
          {...register("email", { required: t("email_is_required") })}
          error={errors.email?.message}
        />
        <TextInput
          label={t("password")}
          placeholder={t("password")}
          {...register("password", { required: t("password_is_required") })}
          error={errors.password?.message}
        />
        <TextInput
          label={t("firstName")}
          placeholder={t("firstName")}
          {...register("firstName", { required: t("firstName_is_required") })}
          error={errors.firstName?.message}
        />
        <TextInput
          label={t("lastName")}
          placeholder={t("lastName")}
          {...register("lastName", { required: t("lastName_is_required") })}
          error={errors.lastName?.message}
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
