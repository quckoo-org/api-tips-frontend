import { useState } from "react";
// TODO MOCK TYPE
import { OrderT } from "@/entities/order";
import { UpdateOrderModal } from "./update-order-modal";
// import { Order } from "@/shared/proto/order/v1/order";

export const useUpdateOrderModal = () => {
  const [modalProps, setModalProps] = useState<{
    onClose: (order?: OrderT) => void;
    orderId: number;
  }>();

  const modal = modalProps ? <UpdateOrderModal {...modalProps} /> : undefined;

  const updateOrder = (orderId: number) => {
    return new Promise<OrderT | undefined>((res) => {
      setModalProps({
        onClose: (order) => {
          res(order);
          setModalProps(undefined);
        },
        orderId,
      });
    });
  };

  return {
    modal,
    updateOrder,
  };
};
