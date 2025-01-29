"use client";

import { Container } from "@mantine/core";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { ROUTES } from "@/shared/router";
import Header from "@/shared/ui/header";

type UiProviderProps = {
  children: React.ReactNode;
  lang: string;
};

export const UiProvider: FC<UiProviderProps> = ({ children, lang }) => {
  const pathname = usePathname();

  const paths = [
    `/${lang}`,
    `/${lang}${ROUTES.LOGIN}`,
    `/${lang}${ROUTES.REGISTER}`,
    `/${lang}${ROUTES.FORGOT_PASSWORD}`,
    `/${lang}${ROUTES.RESET}`,
  ];

  if (!paths.includes(pathname))
    return (
      <>
        <Header />
        <Container className="p-4" size="xl">
          {children}
        </Container>
      </>
    );

  return <>{children}</>;
};
