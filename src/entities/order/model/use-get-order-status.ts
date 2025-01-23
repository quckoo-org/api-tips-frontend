import { useTranslations } from "@/shared/locale/translations";
import { OrderStatus as OrderStatusEnum } from "@/shared/proto/custom_enums/v1/custom_enums";

export const useGetOrderStatus = () => {
  const { t } = useTranslations();

  const translations = {
    ORDER_STATUS_UNSPECIFIED: t("order_status_unspecified"),
    ORDER_STATUS_CREATED: t("order_status_created"),
    ORDER_STATUS_PAID: t("order_status_paid"),
    ORDER_STATUS_CANCELLED: t("order_status_cancelled"),
    UNRECOGNIZED: t("order_status_unrecognized"),
  };

  const getOrderStatus = (status: OrderStatusEnum) => translations[status];

  return { getOrderStatus };
};
