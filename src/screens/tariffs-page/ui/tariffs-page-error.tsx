import { Text } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type TariffsPageErrorProps = {
  className?: string;
};

export const TariffsPageError: FC<TariffsPageErrorProps> = ({ className }) => {
  return (
    <div className={clsx("", className)}>
      <Text>The tariffs could not be loaded</Text>
    </div>
  );
};
