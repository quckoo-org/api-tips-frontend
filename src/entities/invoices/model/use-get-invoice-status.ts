import { useTranslations } from "@/shared/locale/translations";
import { InvoiceStatus as InvoiceStatusEnum } from "@/shared/proto/custom_enums/v1/custom_enums";

export const useGetInvoiceStatus = () => {
  const { t } = useTranslations();

  const translations = {
    INVOICE_STATUS_UNSPECIFIED: t("invoice_status_unspecified"),
    INVOICE_STATUS_CREATED: t("invoice_status_created"),
    INVOICE_STATUS_PAID: t("invoice_status_paid"),
    INVOICE_STATUS_CANCELLED: t("invoice_status_cancelled"),
    UNRECOGNIZED: t("invoice_status_unrecognized"),
  };

  const getInvoiceStatus = (status: InvoiceStatusEnum) => translations[status];

  return { getInvoiceStatus };
};
