import { useState } from "react";
import { User } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { UpdateUserProfileModal } from "./update-user-profile-modal";

export const useUpdateUserProfileModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (user?: User) => void;
  }>();

  const modal = modalProps ? (
    <UpdateUserProfileModal {...modalProps} />
  ) : undefined;

  const updateUserProfile = () => {
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
    updateUserProfile,
  };
};
