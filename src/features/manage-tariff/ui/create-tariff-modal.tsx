"use client";

import { Modal } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { toDecimal } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { TariffForm } from "./tariff-form";
import { TariffFormValues } from "../model/types";
import { useCreateTariff } from "../model/use-create-tariff";

type CreateTariffModalProps = {
  className?: string;
  onClose: (tariff?: Tariff) => void;
};

export const CreateTariffModal: FC<CreateTariffModalProps> = ({
  className,
  onClose,
}) => {
  const { t } = useTranslations();
  const createMutation = useCreateTariff();

  const onCreateTariff = async (tariffData: TariffFormValues) => {
    const response = await createMutation.mutateAsync({
      ...tariffData,
      totalPrice: toDecimal(tariffData.totalPrice),
    });
    onClose(response.tariff);
  };

  return (
    <Modal
      title={t("create_tariff")}
      opened
      onClose={onClose}
      className={clsx("", className)}
    >
      <TariffForm
        onSuccess={onCreateTariff}
        isLoading={createMutation.isPending}
      />
    </Modal>
  );
};
