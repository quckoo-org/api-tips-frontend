"use client";

import { Container } from "@mantine/core";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Header from "@/shared/ui/header";

type UiProviderProps = {
  children: React.ReactNode;
  lang: string;
};

export const UiProvider: FC<UiProviderProps> = ({ children, lang }) => {
  const pathname = usePathname();
  console.log(pathname, "pathname");
  if (pathname !== `/${lang}`)
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
