"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useUpdateInvoice } from "@/features/manage-invoices";
import { UpdateInvoiceFormValuesT } from "@/features/manage-invoices/model/types";
import { UpdateInvoiceForm } from "@/features/manage-invoices/ui/update-invoice-form";
import { useTranslations } from "@/shared/locale/translations";
import {
  Invoice,
  UpdateInvoiceRequest,
} from "@/shared/proto/api_tips_invoices/v1/api_tips_invoices";

type UpdateInvoiceModalProps = {
  className?: string;
  invoice: Invoice;
  onClose: (invoice?: Invoice) => void;
};

export const UpdateInvoiceModal: FC<UpdateInvoiceModalProps> = ({
  className,
  onClose,
  invoice,
}) => {
  const { t } = useTranslations();
  const updateInvoiceMutation = useUpdateInvoice();

  const onUpdateInvoice = async (data: UpdateInvoiceFormValuesT) => {
    const invoiceRequest: UpdateInvoiceRequest = {
      ...data,
      invoiceId: invoice.guid!,
    };
    const invoiceResponse =
      await updateInvoiceMutation.mutateAsync(invoiceRequest);

    onClose(invoiceResponse.invoice);
  };

  return (
    <Modal
      title={t("add_invoice")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <UpdateInvoiceForm
        isLoading={updateInvoiceMutation.isPending}
        onSuccess={onUpdateInvoice}
        error={updateInvoiceMutation.error?.description}
      />
    </Modal>
  );
};
