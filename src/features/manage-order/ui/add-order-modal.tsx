"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import {
  Order,
  AddOrderRequest,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { OrderForm } from "./order-form";
import { useAddOrder } from "../model/use-add-order";

type AddOrderModalProps = {
  className?: string;
  onClose: (order?: Order) => void;
};

export const AddOrderModal: FC<AddOrderModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const addOrderMutation = useAddOrder();

  const onAddOrder = async (req: AddOrderRequest) => {
    const orderResponse = await addOrderMutation.mutateAsync(req);

    onClose(orderResponse.order);
  };

  return (
    <Modal
      title={t("add_order")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <OrderForm
        isLoading={addOrderMutation.isPending}
        onSuccess={onAddOrder}
        error={addOrderMutation.error?.description}
      />
    </Modal>
  );
};
