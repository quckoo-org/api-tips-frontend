"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { PermissionForm } from "@/features/manage-permissions";
import { useUpdatePermission } from "@/features/manage-permissions/model/use-update-permission";
import { useTranslations } from "@/shared/locale/translations";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type UpdatePermissionModalProps = {
  className?: string;
  onClose: (permission?: Permission) => void;
  permission: Permission;
};

export const UpdatePermissionModal: FC<UpdatePermissionModalProps> = ({
  className,
  onClose,
  permission,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdatePermission();

  const onCreatePermission = async (permissionData: Omit<Permission, "id">) => {
    const response = await updateMutation.mutateAsync({
      permissionId: permission.id,
      name: permissionData.name,
      methodsIds: permissionData.methods.map((method) => method.id),
    });
    onClose(response.permission);
  };

  return (
    <Modal
      size="xl"
      title={t("update_permission")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <PermissionForm
        onSuccess={onCreatePermission}
        isLoading={updateMutation.isPending}
        permission={permission}
      />
    </Modal>
  );
};
