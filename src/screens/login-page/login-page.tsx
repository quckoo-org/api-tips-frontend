import clsx from "clsx";
import { FC } from "react";

import { LoginByEmail } from "@/features/login-by-email";

type LoginPageProps = {
  className?: string;
};

export const LoginPage: FC<LoginPageProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {/*<Test />*/}
      <LoginByEmail />
    </div>
  );
};
