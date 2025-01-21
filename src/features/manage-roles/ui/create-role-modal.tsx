"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useGetPermissions } from "@/entities/permissions";
import { useCreateRole } from "@/features/manage-roles";
import { RoleForm } from "@/features/manage-roles/ui/role-form";
import { useTranslations } from "@/shared/locale/translations";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type CreateRoleModalProps = {
  className?: string;
  onClose: (role?: Role) => void;
};

export const CreateRoleModal: FC<CreateRoleModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const createMutation = useCreateRole();
  const permissionsQuery = useGetPermissions();

  const onCreateRole = async (roleData: Omit<Role, "id">) => {
    const response = await createMutation.mutateAsync({
      name: roleData.name,
      permissionsIds: roleData.permissions.map((permission) => permission.id),
    });
    onClose(response.role);
  };

  return (
    <Modal
      size="xl"
      title={t("create_role")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <RoleForm
        onSuccess={onCreateRole}
        isLoading={createMutation.isPending}
        permissions={permissionsQuery.data?.permissions}
      />
    </Modal>
  );
};
