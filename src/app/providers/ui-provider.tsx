"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import { ROUTES } from "@/shared/router";
import { Sidebar } from "@/widgets/sidebar";

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
      <div className="flex h-screen ">
        <Sidebar className="sticky top-0 h-screen" />
        <div className="p-6 mx-auto flex-1 overflow-auto">{children}</div>
      </div>
    );

  return <>{children}</>;
};
