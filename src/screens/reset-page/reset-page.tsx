"use client";
import { Loader } from "@mantine/core";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { ResetForm } from "@/features/auth";
import { useGetRecoveryCode } from "@/features/auth/model/use-get-recovery-code";
import { ResetPageError } from "@/screens/reset-page/reset-page-error";

type ResetPageProps = {
  className?: string;
};

export const ResetPage: FC<ResetPageProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? undefined;
  const code = searchParams.get("code") ?? undefined;

  const { getRecoveryCodeQuery } = useGetRecoveryCode({ email, code });

  if (getRecoveryCodeQuery.isPending) {
    return <Loader className={"self-center"} />;
  }
  if (getRecoveryCodeQuery.error || !email || !code) {
    return (
      <ResetPageError
        errorText={getRecoveryCodeQuery.error?.response?.data?.Message}
        email={email}
      />
    );
  }
  if (getRecoveryCodeQuery.isSuccess) {
    return (
      <div className={clsx("", className)}>
        <ResetForm code={getRecoveryCodeQuery.data.Code} email={email} />
      </div>
    );
  }
};
