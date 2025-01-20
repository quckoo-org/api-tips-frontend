import { useState } from "react";
import { CreatePermissionModal } from "@/features/manage-permissions";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export function useCreatePermissionModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (permission?: Permission) => void;
  }>();

  const modal = modalProps ? (
    <CreatePermissionModal {...modalProps} />
  ) : undefined;

  const createPermission = () => {
    return new Promise<Permission | undefined>((res) => {
      setModalProps({
        onClose: (permission) => {
          res(permission);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    createPermission,
  };
}
