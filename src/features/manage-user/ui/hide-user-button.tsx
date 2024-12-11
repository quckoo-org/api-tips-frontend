import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useHideUser } from "../model/use-hide-user";

type HideUserButtonProps = {
  className?: string;
  checked: boolean;
  userId: number;
};

export const HideUserButton: FC<HideUserButtonProps> = ({
  className,
  checked,
  userId,
}) => {
  const { handleHideUser, isLoading } = useHideUser();

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
          onChange={(value) => handleHideUser(userId, value.target.checked)}
        />
      )}
    </div>
  );
};
