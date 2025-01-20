"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useGetPermissions } from "@/entities/permissions";
import { useUpdateRole } from "@/features/manage-roles";
import { RoleForm } from "@/features/manage-roles/ui/role-form";
import { useTranslations } from "@/shared/locale/translations";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type UpdateRoleModalProps = {
  className?: string;
  onClose: (role?: Role) => void;
  role: Role;
};

export const UpdateRoleModal: FC<UpdateRoleModalProps> = ({
  className,
  onClose,
  role,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdateRole();
  const permissionsQuery = useGetPermissions();

  const onCreateRole = async (roleData: Omit<Role, "id">) => {
    const response = await updateMutation.mutateAsync({
      roleId: role.id,
      name: roleData.name,
      permissionsIds: roleData.permissions.map((permission) => permission.id),
    });
    onClose(response.role);
  };

  return (
    <Modal
      size="xl"
      title={t("update_role")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <RoleForm
        onSuccess={onCreateRole}
        isLoading={updateMutation.isPending}
        permissions={permissionsQuery.data?.permissions}
        role={role}
      />
    </Modal>
  );
};
