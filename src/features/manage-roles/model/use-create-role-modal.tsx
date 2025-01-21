import { useState } from "react";
import { CreateRoleModal } from "@/features/manage-roles";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export function useCreateRoleModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (role?: Role) => void;
  }>();

  const modal = modalProps ? <CreateRoleModal {...modalProps} /> : undefined;

  const createRole = () => {
    return new Promise<Role | undefined>((res) => {
      setModalProps({
        onClose: (role) => {
          res(role);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    createRole,
  };
}
