import { useState } from "react";
import { TariffT } from "@/entities/tariff";
import { CreateTariffModal } from "./create-tariff-modal";

export function useCreateTariffModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (tariff?: TariffT) => void;
  }>();

  const modal = modalProps ? <CreateTariffModal {...modalProps} /> : undefined;

  const createTariff = () => {
    return new Promise<TariffT | undefined>((res) => {
      setModalProps({
        onClose: (tariff) => {
          res(tariff);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    createTariff,
  };
}
