"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { TariffT } from "@/entities/tariff";
import { toDecimal } from "@/shared/lib/decimal";
import { useTranslations } from "@/shared/locale/translations";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { TariffForm } from "./tariff-form";
import { TariffFormValues } from "../model/types";
import { useUpdateTariff } from "../model/use-update-tariff";

type UpdateTariffModalProps = {
  className?: string;
  onClose: (tariff?: TariffT) => void;
  tariff: Tariff;
};

export const UpdateTariffModal: FC<UpdateTariffModalProps> = ({
  className,
  onClose,
  tariff,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdateTariff();

  const onUpdateTariff = async (tariffData: TariffFormValues) => {
    const response = await updateMutation.mutateAsync({
      ...tariffData,
      tariffId: tariff.id,
      totalPrice: toDecimal(tariffData.totalPrice),
    });
    onClose(response.tariff);
  };

  return (
    <Modal
      title={t("update_tariff")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <TariffForm onSuccess={onUpdateTariff} tariff={tariff} />
    </Modal>
  );
};
