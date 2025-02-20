"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { InvoiceForm, useCreateInvoice } from "@/features/manage-invoices";
import { CreateInvoiceFormValuesT } from "@/features/manage-invoices/model/types";
import { toDecimal } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import {
  CreateInvoiceRequest,
  Invoice,
} from "@/shared/proto/api_tips_invoice/v1/api_tips_invoice";

type CreateInvoiceModalProps = {
  className?: string;
  onClose: (invoice?: Invoice) => void;
  orderId?: number;
  onSuccess?: () => void;
};

export const CreateInvoiceModal: FC<CreateInvoiceModalProps> = ({
  className,
  onClose,
  orderId,
  onSuccess,
}) => {
  const { t } = useTranslations();
  const addInvoiceMutation = useCreateInvoice();

  const onCreateInvoice = async (req: CreateInvoiceFormValuesT) => {
    const invoiceRequest: CreateInvoiceRequest = {
      ...req,
      totalAmount: toDecimal(req.totalAmount),
      orderId: +req.orderId,
    };

    addInvoiceMutation.mutate(invoiceRequest, {
      onSuccess: (invoiceResponse) => {
        onClose(invoiceResponse.invoice);
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  return (
    <Modal
      title={t("create_invoice")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <InvoiceForm
        isLoading={addInvoiceMutation.isPending}
        onSuccess={onCreateInvoice}
        error={addInvoiceMutation.error?.description}
        orderId={orderId}
      />
    </Modal>
  );
};
