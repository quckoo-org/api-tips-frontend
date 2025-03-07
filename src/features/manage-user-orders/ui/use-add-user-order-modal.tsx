import { useState } from "react";

import { Order } from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { AddUserOrderModal } from "./add-user-order-modal";

export const useAddUserOrderModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (Order?: Order) => void;
    tariffId?: number;
  }>();

  const modal = modalProps ? <AddUserOrderModal {...modalProps} /> : undefined;

  const addOrder = (tariffId?: number) => {
    return new Promise<Order | undefined>((res) => {
      setModalProps({
        onClose: (Order) => {
          res(Order);
          setModalProps(undefined);
        },
        tariffId,
      });
    });
  };

  return {
    modal,
    addOrder,
  };
};
