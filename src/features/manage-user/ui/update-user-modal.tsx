import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { UserForm } from "./user-form";

type UpdateUserModalProps = {
  className?: string;
  userId: number;
  onClose: () => void;
};

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  className,
  onClose,
  userId,
}) => {
  return (
    <Modal
      className={clsx("", className)}
      withinPortal
      title="Update user"
      onClose={onClose}
      opened={true}
    >
      <UserForm onSuccess={onClose} userId={userId} />
    </Modal>
  );
};
