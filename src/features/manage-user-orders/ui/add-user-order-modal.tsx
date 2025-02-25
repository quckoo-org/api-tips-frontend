"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import {
  Order,
  AddOrderRequest,
} from "@/shared/proto/api_tips_order/v1/api_tips_order";
import { UserOrderForm } from "./user-order-form";
import { useAddUserOrder } from "../model/use-add-user-order";

type AddOrderModalProps = {
  className?: string;
  onClose: (order?: Order) => void;
};

export const AddUserOrderModal: FC<AddOrderModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const addOrderMutation = useAddUserOrder();
  const onAddOrder = async (req: Omit<AddOrderRequest, "userId">) => {
    const newOrder: AddOrderRequest = {
      ...req,
    };
    const orderResponse = await addOrderMutation.mutateAsync(newOrder);

    onClose(orderResponse.order);
  };

  return (
    <Modal
      title={t("add_order")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <UserOrderForm
        isLoading={addOrderMutation.isPending}
        onSuccess={onAddOrder}
        error={addOrderMutation.error?.description}
      />
    </Modal>
  );
};
