import { useState } from "react";
import { UpdatePermissionModal } from "@/features/manage-permissions/ui/update-permission-modal";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export function useUpdatePermissionModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (role?: Permission) => void;
    permission: Permission;
  }>();

  const modal = modalProps ? (
    <UpdatePermissionModal {...modalProps} />
  ) : undefined;

  const updatePermission = (permission: Permission) => {
    return new Promise<Permission | undefined>((res) => {
      setModalProps({
        onClose: (permission) => {
          res(permission);
          setModalProps(undefined);
        },
        permission,
      });
    });
  };

  return {
    modal,
    updatePermission,
  };
}
