import { useState } from "react";
import { useDeletePermission } from "@/features/manage-permissions";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { DeleteConfirmationModal } from "@/shared/ui";

export function useDeletePermissionModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (permission?: Permission) => void;
    handleDelete: () => void;
  }>();

  const deleteMutation = useDeletePermission();
  const modal = modalProps ? (
    <DeleteConfirmationModal
      {...modalProps}
      isLoading={deleteMutation.isPending}
    />
  ) : undefined;

  const deletePermission = (permission: Permission) => {
    return new Promise<Permission | undefined>((res) => {
      setModalProps({
        onClose: (permission) => {
          res(permission);
          setModalProps(undefined);
        },
        handleDelete: async () => {
          await deleteMutation.mutateAsync({ permissionId: permission.id });
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    deletePermission,
  };
}
