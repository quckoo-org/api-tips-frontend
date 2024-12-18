import { Text } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type UserRegistryPageErrorProps = {
  className?: string;
};

export const UserRegistryPageError: FC<UserRegistryPageErrorProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Text>The user register could not be loaded</Text>
    </div>
  );
};
