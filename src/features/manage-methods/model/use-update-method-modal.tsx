import { useState } from "react";
import { UpdateMethodModal } from "@/features/manage-methods/ui/update-method-modal";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export function useUpdateMethodModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (method?: Method) => void;
    method: Method;
  }>();

  const modal = modalProps ? <UpdateMethodModal {...modalProps} /> : undefined;

  const updateMethod = (method: Method) => {
    return new Promise<Method | undefined>((res) => {
      setModalProps({
        onClose: (method) => {
          res(method);
          setModalProps(undefined);
        },
        method,
      });
    });
  };

  return {
    modal,
    updateMethod,
  };
}
