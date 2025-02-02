"use client";
import { Card, Text, Title } from "@mantine/core";
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

  return (
    <Card
      shadow="sm"
      radius="lg"
      padding="xl"
      className={clsx(
        "bg-white border border-gray-300 w-full flex flex-col gap-y-4 max-w-md",
        className,
      )}
    >
      <Title className="text-center" size="h3">
        {t("invalid_link")}
      </Title>
      <Text className="text-gray-600 text-sm text-center">
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
  );
};
