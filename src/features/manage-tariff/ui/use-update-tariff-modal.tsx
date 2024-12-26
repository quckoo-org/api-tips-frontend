import { useState } from "react";
import { TariffT } from "@/entities/tariff";
import { UpdateTariffModal } from "./update-tariff-modal";

export function useUpdateTariffModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (tariff?: TariffT) => void;
    tariffId: number;
  }>();

  const modal = modalProps ? <UpdateTariffModal {...modalProps} /> : undefined;

  const updateTariff = (tariffId: number) => {
    return new Promise<TariffT | undefined>((res) => {
      setModalProps({
        onClose: (tariff) => {
          res(tariff);
          setModalProps(undefined);
        },
        tariffId,
      });
    });
  };

  return {
    modal,
    updateTariff,
  };
}
