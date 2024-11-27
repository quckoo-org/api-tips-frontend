import clsx from "clsx";
import { FC } from "react";

import { LoginByEmail } from "@/features/login-by-email";
import Test from "@/features/test/test";

type LoginPageProps = {
  className?: string;
};

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      Логин страница
      <Test />
      <LoginByEmail />
    </div>
  );
};
