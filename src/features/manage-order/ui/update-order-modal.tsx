import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { OrderT } from "@/entities/order";
import { useTranslations } from "@/shared/locale/translations";
import { OrderForm } from "./order-form";
import { OrderFormValues } from "../model/types";
import { useUpdateOrder } from "../model/use-update-order";
// import { UpdateOrderRequest, Order } from "@/shared/proto/order/v1/order";
//TODO MOCK TYPE
type UpdateOrderRequest = OrderFormValues & { id: number };

type UpdateOrderModalProps = {
  className?: string;
  orderId: number;
  onClose: (order?: OrderT) => void;
};

export const UpdateOrderModal: FC<UpdateOrderModalProps> = ({
  className,
  onClose,
  orderId,
}) => {
  const { t } = useTranslations();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateMutation = useUpdateOrder();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onUpdateOrder = async (orderData: OrderFormValues) => {
    const updateOrderRequest: UpdateOrderRequest = {
      ...orderData,
      id: orderId,
    };
    const orderResponse = await updateMutation.mutateAsync(updateOrderRequest);
    onClose(orderResponse.order);
  };

  return (
    <Modal
      className={clsx("", className)}
      withinPortal
      title={t("update_order")}
      onClose={onClose}
      opened={true}
    >
      <OrderForm onSuccess={onUpdateOrder} orderId={orderId} />
    </Modal>
  );
};
