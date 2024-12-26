"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { CreateUserRequest, User } from "@/shared/proto/user/v1/user";
import { UserForm } from "./user-form";
import { UserFormValues } from "../model/types";
import { useCreateUser } from "../model/use-create-user";

type CreateUserModalProps = {
  className?: string;
  onClose: (user?: User) => void;
};

export const CreateUserModal: FC<CreateUserModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createMutation = useCreateUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCreateUser = async (userData: UserFormValues) => {

    //TODO: fix
    createMutation.mutateAsync(userData as CreateUserRequest);
    onClose({} as User);
  };

  return (
    <Modal
      title={t("create_user")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <UserForm onSuccess={onCreateUser} />
    </Modal>
  );
};
