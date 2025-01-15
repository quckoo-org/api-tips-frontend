import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useHideTariff } from "../model/use-hide-tariff";

type HideTariffButtonProps = {
  className?: string;
  checked: boolean;
  tariffId: number;
};

export const HideTariffButton: FC<HideTariffButtonProps> = ({
  className,
  checked,
  tariffId,
}) => {
  const { handleHideTariff, isLoading } = useHideTariff();

  return (
    <div
      className={clsx("flex justify-center items-center relative", className)}
    >
      {isLoading ? (
        <Loader size="xs" />
      ) : (
        <Checkbox
          disabled={isLoading}
          checked={checked}
          onChange={(value) => handleHideTariff(tariffId, value.target.checked)}
        />
      )}
    </div>
  );
};
