"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import {
  AddUserRequest,
  User,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";
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
  const createMutation = useCreateUser();
  const onCreateUser = async (userData: UserFormValues) => {
    //TODO: fix
    createMutation.mutateAsync({ rolesIds: [], ...userData } as AddUserRequest);
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
