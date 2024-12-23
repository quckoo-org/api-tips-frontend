import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { UpdateUserRequest, User } from "@/shared/proto/user/v1/user";
import { UserForm } from "./user-form";
import { UserFormValues } from "../model/types";
import { useUpdateUser } from "../model/use-update-user";


type UpdateUserModalProps = {
  className?: string;
  userId: number;
  onClose: (user?: User) => void;
};

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  className,
  onClose,
  userId,
}) => {
  const { t } = useTranslations();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateMutation = useUpdateUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onUpdateUser = async (userData: UserFormValues) => {
  const updateUserRequest: UpdateUserRequest = {
    ...userData,
    id: userId
  }
   const userResponse = await updateMutation.mutateAsync(updateUserRequest);
    onClose(userResponse.user);
  };

  return (
    <Modal
      className={clsx("", className)}
      withinPortal
      title={t("update_user")}
      onClose={onClose}
      opened={true}
    >
      <UserForm onSuccess={onUpdateUser} userId={userId} />
    </Modal>
  );
};
