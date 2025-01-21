"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import {
  PermissionForm,
  useCreatePermission,
} from "@/features/manage-permissions";
import { useTranslations } from "@/shared/locale/translations";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type CreatePermissionModalProps = {
  className?: string;
  onClose: (permission?: Permission) => void;
};

export const CreatePermissionModal: FC<CreatePermissionModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const createMutation = useCreatePermission();

  const onCreatePermission = async (permissionData: Omit<Permission, "id">) => {
    const response = await createMutation.mutateAsync({
      name: permissionData.name,
      methodsIds: permissionData.methods.map((permission) => permission.id),
    });
    onClose(response.permission);
  };

  return (
    <Modal
      size="xl"
      title={t("create_permission")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <PermissionForm
        onSuccess={onCreatePermission}
        isLoading={createMutation.isPending}
      />
    </Modal>
  );
};
