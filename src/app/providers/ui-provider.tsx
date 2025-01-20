"use client";

import { Container } from "@mantine/core";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Header from "@/shared/ui/header";

type UiProviderProps = {
  children: React.ReactNode;
};

export const UiProvider: FC<UiProviderProps> = ({ children }) => {
  const pathname = usePathname();
  if (!pathname.includes("/welcome-landing"))
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
