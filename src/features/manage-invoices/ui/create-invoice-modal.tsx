"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { InvoiceForm, useCreateInvoice } from "@/features/manage-invoices";
import { useTranslations } from "@/shared/locale/translations";
import {
  CreateInvoiceRequest,
  Invoice,
} from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

type CreateInvoiceModalProps = {
  className?: string;
  onClose: (invoice?: Invoice) => void;
};

export const CreateInvoiceModal: FC<CreateInvoiceModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const addInvoiceMutation = useCreateInvoice();

  const onCreateInvoice = async (req: CreateInvoiceRequest) => {
    const invoiceResponse = await addInvoiceMutation.mutateAsync(req);

    onClose(invoiceResponse.invoice);
  };

  return (
    <Modal
      title={t("add_invoice")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <InvoiceForm
        isLoading={addInvoiceMutation.isPending}
        onSuccess={onCreateInvoice}
        error={addInvoiceMutation.error?.description}
      />
    </Modal>
  );
};
