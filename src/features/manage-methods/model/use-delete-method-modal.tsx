import { useState } from "react";
import { useDeleteMethod } from "@/features/manage-methods";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { DeleteConfirmationModal } from "@/shared/ui";

export function useDeleteMethodModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (method?: Method) => void;
    handleDelete: () => void;
  }>();

  const deleteMutation = useDeleteMethod();
  const modal = modalProps ? (
    <DeleteConfirmationModal
      {...modalProps}
      isLoading={deleteMutation.isPending}
    />
  ) : undefined;

  const deleteMethod = (method: Method) => {
    return new Promise<Method | undefined>((res) => {
      setModalProps({
        onClose: (method) => {
          res(method);
          setModalProps(undefined);
        },
        handleDelete: async () => {
          await deleteMutation.mutateAsync({ methodId: method.id });
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    deleteMethod,
  };
}
