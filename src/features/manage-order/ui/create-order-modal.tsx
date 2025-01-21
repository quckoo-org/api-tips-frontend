"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { OrderT } from "@/entities/order";
import { useTranslations } from "@/shared/locale/translations";
import { OrderForm } from "./order-form";
import { OrderFormValues } from "../model/types";
import { useCreateOrder } from "../model/use-create-order";

//TODO MOCK TYPE
type CreateOrderRequest = unknown;

type CreateOrderModalProps = {
  className?: string;
  onClose: (order?: OrderT) => void;
};

export const CreateOrderModal: FC<CreateOrderModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const createMutation = useCreateOrder();

  const onCreateOrder = async (orderData: OrderFormValues) => {
    const request: CreateOrderRequest = {
      email: orderData.email,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
    };
    const orderResponse = await createMutation.mutateAsync(request);

    onClose(orderResponse.order);
  };

  return (
    <Modal
      title={t("create_order")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <OrderForm
        onSuccess={onCreateOrder}
        error={createMutation.error?.description}
      />
    </Modal>
  );
};
