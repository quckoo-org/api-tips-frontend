import { useState } from "react";
import { TariffT } from "@/entities/tariff";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { UpdateTariffModal } from "./update-tariff-modal";

export function useUpdateTariffModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (tariff?: TariffT) => void;
    tariff: Tariff;
  }>();

  const modal = modalProps ? <UpdateTariffModal {...modalProps} /> : undefined;

  const updateTariff = (tariff: Tariff) => {
    return new Promise<TariffT | undefined>((res) => {
      setModalProps({
        onClose: (tariff) => {
          res(tariff);
          setModalProps(undefined);
        },
        tariff,
      });
    });
  };

  return {
    modal,
    updateTariff,
  };
}
