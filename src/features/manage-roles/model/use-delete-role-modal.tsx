import { useState } from "react";
import { useDeleteRole } from "@/features/manage-roles";
import { Role } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { DeleteConfirmationModal } from "@/shared/ui";

export function useDeleteRoleModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (role?: Role) => void;
    handleDelete: () => void;
  }>();

  const deleteMutation = useDeleteRole();
  const modal = modalProps ? (
    <DeleteConfirmationModal
      {...modalProps}
      isLoading={deleteMutation.isPending}
    />
  ) : undefined;

  const deleteRole = (role: Role) => {
    return new Promise<Role | undefined>((res) => {
      setModalProps({
        onClose: (role) => {
          res(role);
          setModalProps(undefined);
        },
        handleDelete: async () => {
          await deleteMutation.mutateAsync({ roleId: role.id });
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    deleteRole,
  };
}
