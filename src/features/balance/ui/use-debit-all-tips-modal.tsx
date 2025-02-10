import { useState } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { DeleteConfirmationModal } from "@/shared/ui";
import { useDebitAllTips } from "../model/use-debit-all-tips";

export function useDebitAllTipsModal() {
  const { t } = useTranslations();
  const [modalProps, setModalProps] = useState<{
    onClose: (method?: Method) => void;
    handleDelete: () => void;
  }>();

  const debitMutation = useDebitAllTips();

  const modal = modalProps ? (
    <DeleteConfirmationModal
      {...modalProps}
      modalTitle={t("debit_all_tips")}
      modalText={t("are_you_sure_you_want_to_debit_all_tips_from_all_users?")}
      isLoading={debitMutation.isPending}
    />
  ) : undefined;

  const debitAllTips = () => {
    return new Promise<undefined>(() => {
      setModalProps({
        onClose: () => {
          setModalProps(undefined);
        },
        handleDelete: async () => {
          await debitMutation.mutateAsync({});
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    debitAllTips,
  };
}
