import { useState } from "react";
import { UpdateRoleModal } from "@/features/manage-roles/ui/update-role-modal";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export function useUpdateRoleModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (role?: Role) => void;
    role: Role;
  }>();

  const modal = modalProps ? <UpdateRoleModal {...modalProps} /> : undefined;

  const updateRole = (role: Role) => {
    return new Promise<Role | undefined>((res) => {
      setModalProps({
        onClose: (role) => {
          res(role);
          setModalProps(undefined);
        },
        role,
      });
    });
  };

  return {
    modal,
    updateRole,
  };
}
