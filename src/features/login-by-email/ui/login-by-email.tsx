"use client";

import { Button, Input, PasswordInput } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";

type LoginByEmailProps = {
  className?: string;
};

export const LoginByEmail: FC<LoginByEmailProps> = ({ className }) => {
  const { t } = useTranslations();

  return (
    <form className={clsx("p-3 border max-w-lg rounded", className)}>
      <h3 className="text-2xl mb-4">{t("Войти")}</h3>
      <Input className="mb-2" placeholder="Email" />
      <PasswordInput className="mb-4" placeholder="password" />
      <Button>{t("Войти")}</Button>
    </form>
  );
};
