"use client";

import { Button } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { useUpdatePasswordModal } from "./use-update-password-modal";

type UpdatePasswordButtonProps = {
  className?: string;
};

export const UpdatePasswordButton: FC<UpdatePasswordButtonProps> = ({
  className,
}) => {
  const { t } = useTranslations();
  const updateModal = useUpdatePasswordModal();

  return (
    <>
      <Button
        onClick={updateModal.updatePassword}
        color="dark"
        className={clsx("", className)}
      >
        {t("update_password")}
      </Button>
      {updateModal.modal}
    </>
  );
};
