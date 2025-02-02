import clsx from "clsx";
import { FC } from "react";

import { LoginByEmailForm } from "@/features/auth";

type LoginPageProps = {
  className?: string;
};

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
  return <LoginByEmailForm className={clsx("", className)} />;
};
