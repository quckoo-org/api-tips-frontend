import React, { PropsWithChildren } from "react";
import AuthUiLayout from "@/shared/ui/auth-ui-layout";

type AuthLayoutProps = PropsWithChildren;

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthUiLayout>{children}</AuthUiLayout>;
}
