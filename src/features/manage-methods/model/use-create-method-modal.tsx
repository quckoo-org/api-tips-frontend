import { useState } from "react";
import { CreateMethodModal } from "@/features/manage-methods";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export function useCreateMethodModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (method?: Method) => void;
  }>();

  const modal = modalProps ? <CreateMethodModal {...modalProps} /> : undefined;

  const createMethod = () => {
    return new Promise<Method | undefined>((res) => {
      setModalProps({
        onClose: (method) => {
          res(method);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    createMethod,
  };
}
