"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { MethodForm } from "@/features/manage-methods";
import { useUpdateMethod } from "@/features/manage-methods/model/use-update-method";
import { useTranslations } from "@/shared/locale/translations";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type UpdateMethodModalProps = {
  className?: string;
  onClose: (method?: Method) => void;
  method: Method;
};

export const UpdateMethodModal: FC<UpdateMethodModalProps> = ({
  className,
  onClose,
  method,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdateMethod();

  const onCreateMethod = async (methodData: Omit<Method, "id">) => {
    const response = await updateMutation.mutateAsync({
      methodId: method.id,
      name: methodData.name,
    });
    onClose(response.method);
  };

  return (
    <Modal
      size="xl"
      title={t("update_method")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <MethodForm
        onSuccess={onCreateMethod}
        isLoading={updateMutation.isPending}
        method={method}
      />
    </Modal>
  );
};
