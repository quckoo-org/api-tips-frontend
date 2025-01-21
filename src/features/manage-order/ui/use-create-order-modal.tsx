import { useState } from "react";
//TODO MOCK TYPE
import { OrderT } from "@/entities/order";
import { CreateOrderModal } from "./create-order-modal";
// import { Order } from "@/shared/proto/Order/v1/Order";

export const useCreateOrderModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (Order?: OrderT) => void;
  }>();

  const modal = modalProps ? <CreateOrderModal {...modalProps} /> : undefined;

  const createOrder = () => {
    return new Promise<OrderT | undefined>((res) => {
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
    createOrder,
  };
};
