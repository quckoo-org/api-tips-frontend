"use client";
import { Card, Text } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import React, { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES } from "@/shared/router";
type ResetPageErrorProps = {
  className?: string;
  errorText: string | undefined;
  email: string | undefined;
};

export const ResetPageError: FC<ResetPageErrorProps> = ({
  className,
  errorText,
  email,
}) => {
  const { t } = useTranslations();
  console.log(email);
  return (
    <div
      className={clsx(
        "flex items-center justify-center min-h-screen bg-gray-50 p-4",
        className,
      )}
    >
      <Card shadow="md" radius="md" padding="lg" className="bg-white max-w-md">
        <Text className="text-xl font-semibold mb-4 text-center">
          {t("invalid_link")}
        </Text>
        <Text className="text-gray-600 text-sm mb-6 text-center">
          {errorText || t("reset_error_text_default")}
        </Text>
        <div className="text-center">
          <Link
            href={ROUTES.FORGOT_PASSWORD + `?email=${email ?? ""}`}
            className="text-sm text-blue-500 hover:underline"
          >
            {t("request_new_link")}
          </Link>
        </div>
      </Card>
    </div>
  );
};
