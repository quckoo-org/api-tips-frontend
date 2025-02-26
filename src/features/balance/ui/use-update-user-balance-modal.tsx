import { useState } from "react";
import { UpdateUserBalanceModal } from "./update-user-balance-modal";

export const useUpdateUserBalanceModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (user?: number) => void;
  }>();

  const modal = modalProps ? (
    <UpdateUserBalanceModal {...modalProps} />
  ) : undefined;

  const updateUserBalance = () => {
    return new Promise<number | undefined>((res) => {
      setModalProps({
        onClose: (userId) => {
          res(userId);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    updateUserBalance,
  };
};
