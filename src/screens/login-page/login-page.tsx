import clsx from "clsx";
import { FC } from "react";

import { LoginByEmailForm } from "@/features/auth";

type LoginPageProps = {
  className?: string;
};

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      <LoginByEmailForm />
    </div>
  );
};
