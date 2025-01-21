import { useState } from "react";
import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";
import { CreateTariffModal } from "./create-tariff-modal";

export function useCreateTariffModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (tariff?: Tariff) => void;
  }>();

  const modal = modalProps ? <CreateTariffModal {...modalProps} /> : undefined;

  const createTariff = () => {
    return new Promise<Tariff | undefined>((res) => {
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
