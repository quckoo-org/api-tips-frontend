import clsx from "clsx";

import React, { FC } from "react";
import { ForgotPasswordForm } from "@/features/auth/ui/forgot-password-form";

type ForgotPasswordPageProps = {
  className?: string;
};
export const ForgotPasswordPage: FC<ForgotPasswordPageProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <ForgotPasswordForm />{" "}
    </div>
  );
};
