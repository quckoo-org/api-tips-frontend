"use client";

import { TextInput, Button, Card, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordRecovery } from "@/features/auth";
import { RecoveryPasswordReqT } from "@/features/auth/model/types";
import { useTranslations } from "@/shared/locale/translations";

export const ForgotPasswordForm = () => {
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  const [resendCooldown, setResendCooldown] = useState<number>(0); // Таймер повторной отправки

  const { register, handleSubmit } = useForm<RecoveryPasswordReqT>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const recoveryPasswordQuery = usePasswordRecovery();

  const handleResetPassword = async (data: RecoveryPasswordReqT) => {
    await recoveryPasswordQuery.mutateAsync({ email: data.email });

    setResendCooldown(60);
  };

  // Логика для таймера
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  return (
    <Card
      shadow="sm"
      radius="lg"
      padding="xl"
      className="bg-white border border-gray-300"
    >
      <Title className="mb-4" size="h3">
        {t("forgot_password_title")}
      </Title>
      <Text className="text-gray-600 mb-4 ">
        {t("forgot_password_description")}
      </Text>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <TextInput
          {...register("email", {
            required: t("email_is_required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("email_is_invalid"),
            },
          })}
          label={t("email")}
          placeholder={t("enter_email")}
          className="mb-4 "
          labelProps={{ className: "font-semibold mb-1" }}
        />
        <Button
          type={"submit"}
          fullWidth
          variant="filled"
          color="dark"
          radius="lg"
          disabled={resendCooldown > 0}
          loading={recoveryPasswordQuery.isPending}
        >
          {resendCooldown > 0
            ? t("resend_in") + resendCooldown + t("seconds")
            : t("reset_password")}
        </Button>
      </form>
      <div className="mt-4">
        <Link href="/login" className="text-sm text-blue-500 hover:underline">
          {t("back_to_login")}
        </Link>
      </div>
    </Card>
  );
};
