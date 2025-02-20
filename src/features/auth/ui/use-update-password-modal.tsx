"use client";

import { useState } from "react";
import { UpdatePasswordModal } from "./update-password-modal";

export const useUpdatePasswordModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: () => void;
  }>();

  const modal = modalProps ? (
    <UpdatePasswordModal {...modalProps} />
  ) : undefined;

  const updatePassword = () => {
    return new Promise<void>(() => {
      setModalProps({
        onClose: () => {
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    updatePassword,
  };
};
