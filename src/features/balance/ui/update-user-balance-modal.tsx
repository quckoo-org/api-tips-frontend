import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { UpdateBalanceRequest } from "@/shared/proto/api_tips_balance/v1/api_tips_balance";
import { UserBalanceForm } from "./user-balance-form";
import { useUpdateUserBalance } from "../model/use-update-user-balance";

type UpdateUserModalProps = {
  className?: string;
  userId: number;
  onClose: (user?: number) => void;
};

export const UpdateUserBalanceModal: FC<UpdateUserModalProps> = ({
  className,
  onClose,
  userId,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdateUserBalance();

  const onUpdateUserBalance = async (
    updateBalanceReq: UpdateBalanceRequest,
  ) => {
    const userResponse = await updateMutation.mutateAsync(updateBalanceReq);
    onClose(userResponse.userId);
  };

  return (
    <Modal
      className={clsx("", className)}
      withinPortal
      title={t("update_user_balance")}
      onClose={onClose}
      opened={true}
    >
      <UserBalanceForm onSuccess={onUpdateUserBalance} userId={userId} />
    </Modal>
  );
};
