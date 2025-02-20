import { Button, Modal, Text, Group } from "@mantine/core";
import clsx from "clsx";
import React from "react";
import { useTranslations } from "@/shared/locale/translations";

type DeleteConfirmationModalProps<T> = {
  className?: string;
  onClose: (response?: T) => void;
  handleDelete: () => void;
  modalText?: string;
  modalTitle?: string;
  isLoading?: boolean;
};
export const DeleteConfirmationModal = <T,>({
  className,
  handleDelete,
  onClose,
  modalText,
  isLoading,
  modalTitle,
}: DeleteConfirmationModalProps<T>) => {
  const { t } = useTranslations();
  modalText = modalText ? modalText : t("delete_confirmation_text");
  modalTitle = modalTitle ? modalTitle : t("delete_confirmation");
  return (
    <Modal
      onClose={onClose}
      opened
      title={modalTitle}
      centered
      className={clsx("", className)}
    >
      <Text>{modalText}</Text>
      <Group mt="md">
        <Button variant="default" onClick={() => onClose()}>
          {t("cancel")}
        </Button>
        <Button color="red" onClick={handleDelete} loading={isLoading}>
          {t("submit")}
        </Button>
      </Group>
    </Modal>
  );
};
