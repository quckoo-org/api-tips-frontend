"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { MethodForm, useCreateMethod } from "@/features/manage-methods";
import { useTranslations } from "@/shared/locale/translations";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type CreateMethodModalProps = {
  className?: string;
  onClose: (method?: Method) => void;
};

export const CreateMethodModal: FC<CreateMethodModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const createMutation = useCreateMethod();

  const onCreateMethod = async (methodData: Omit<Method, "id">) => {
    const response = await createMutation.mutateAsync({
      name: methodData.name,
    });
    onClose(response.method);
  };

  return (
    <Modal
      size="xl"
      title={t("create_method")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <MethodForm
        onSuccess={onCreateMethod}
        isLoading={createMutation.isPending}
      />
    </Modal>
  );
};
