import { useState } from "react";
import { User } from "@/shared/proto/user/v1/user";
import { UpdateUserModal } from "./update-user-modal";

export const useUpdateUserModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (user?: User) => void;
    userId: string;
  }>();

  const modal = modalProps ? <UpdateUserModal {...modalProps} /> : undefined;

  const updateUser = (userId: string) => {
    return new Promise<User | undefined>((res) => {
      setModalProps({
        onClose: (user) => {
          res(user);
          setModalProps(undefined);
        },
        userId,
      });
    });
  };

  return {
    modal,
    updateUser,
  };
};
