"use client";

import { Text } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES } from "@/shared/router";

type AuthUiLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const AuthUiLayout: FC<AuthUiLayoutProps> = ({ children, className }) => {
  const { t } = useTranslations();

  return (
    <div className={clsx("min-h-screen bg-gray-50", className)}>
      <div className="max-w-[460px] flex flex-col gap-y-4 justify-center h-full m-auto py-6 px-4">
        <Link href={ROUTES.HOME} className="self-center">
          <Image src="/logo-dark.svg" width={163} height={38} alt="logo" />
        </Link>
        <div className="grow flex lg:mt-8 lg:items-start justify-center items-center">
          {children}
        </div>
        <Text className="text-gray-600 self-center text-center">
          {t(
            "By continuing, you acknowledge that you understand and agree to the",
          )}{" "}
          <Link className="text-gray-500 hover:underline" href={ROUTES.HOME}>
            {t("terms_and_conditions")}
          </Link>{" "}
          {t("and")}{" "}
          <Link className="text-gray-500 hover:underline" href={ROUTES.HOME}>
            {t("privacy_policy")}
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default AuthUiLayout;
