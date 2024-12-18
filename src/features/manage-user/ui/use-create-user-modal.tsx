import { useState } from "react";
import { User } from "@/shared/proto/user/v1/user";
import { CreateUserModal } from "./create-user-modal";

export const useCreateUserModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (user?: User) => void;
  }>();

  const modal = modalProps ? <CreateUserModal {...modalProps} /> : undefined;

  const createUser = () => {
    return new Promise<User | undefined>((res) => {
      setModalProps({
        onClose: (user) => {
          res(user);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    createUser,
  };
};
