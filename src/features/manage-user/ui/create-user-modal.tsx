"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { GrpcError } from "@/shared/grpc/grpc-error";
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
  const createMutation = useCreateUser();

  console.log(createMutation.error?.description, "descs");

  const onCreateUser = async (userData: UserFormValues) => {
    const request: CreateUserRequest = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      countryCode: userData.countryCode,
    };
    const userResponse = await createMutation.mutateAsync(request);

    onClose(userResponse.user);
  };

  return (
    <Modal
      title={t("create_user")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <UserForm
        onSuccess={onCreateUser}
        error={createMutation.error?.description}
      />
    </Modal>
  );
};
