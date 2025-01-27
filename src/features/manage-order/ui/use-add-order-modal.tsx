import { useState } from "react";

import { Order } from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { AddOrderModal } from "./add-order-modal";

export const useAddOrderModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (Order?: Order) => void;
  }>();

  const modal = modalProps ? <AddOrderModal {...modalProps} /> : undefined;

  const addOrder = () => {
    return new Promise<Order | undefined>((res) => {
      setModalProps({
        onClose: (Order) => {
          res(Order);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    addOrder,
  };
};
