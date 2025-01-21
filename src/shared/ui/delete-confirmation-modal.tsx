import { Button, Modal, Text, Group } from "@mantine/core";
import clsx from "clsx";
import React from "react";
import { useTranslations } from "@/shared/locale/translations";

type DeleteConfirmationModalProps<T> = {
  className?: string;
  onClose: (response?: T) => void;
  handleDelete: () => void;
  modalText?: string;
  isLoading?: boolean;
};
export const DeleteConfirmationModal = <T,>({
  className,
  handleDelete,
  onClose,
  modalText,
  isLoading,
}: DeleteConfirmationModalProps<T>) => {
  const { t } = useTranslations();
  modalText = t("delete_confirmation_text");
  return (
    <Modal
      onClose={onClose}
      opened
      title={t("delete_confirmation")}
      centered
      className={clsx("", className)}
    >
      <Text>{modalText}</Text>
      <Group mt="md">
        <Button variant="default" onClick={() => onClose()}>
          {t("cancel")}
        </Button>
        <Button color="red" onClick={handleDelete} loading={isLoading}>
          {t("delete")}
        </Button>
      </Group>
    </Modal>
  );
};
