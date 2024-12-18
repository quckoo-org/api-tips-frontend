"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { TariffT } from "@/entities/tariff";
import { useTranslations } from "@/shared/locale/translations";
import { TariffForm } from "./tariff-form";
import { TariffFormValues } from "../model/types";
import { useUpdateTariff } from "../model/use-update-tariff";

type UpdateTariffModalProps = {
  className?: string;
  onClose: (tariff?: TariffT) => void;
  tariffId: number;
};

export const UpdateTariffModal: FC<UpdateTariffModalProps> = ({
  className,
  onClose,
  tariffId,
}) => {
  const { t } = useTranslations();
  const updateMutation = useUpdateTariff();

  const onUpdateTariff = async (tariffData: TariffFormValues) => {
    updateMutation.mutateAsync({ id: tariffId, ...tariffData });
  };

  return (
    <Modal
      title={t("update_tariff")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <TariffForm onSuccess={onUpdateTariff} tariffId={tariffId} />
    </Modal>
  );
};
