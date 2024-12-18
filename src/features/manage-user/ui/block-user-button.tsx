import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useBlockUser } from "../model/use-block-user";

type BlockUserButtonProps = {
  className?: string;
  checked: boolean;
  userId: number;
};

export const BlockUserButton: FC<BlockUserButtonProps> = ({
  className,
  checked,
  userId,
}) => {
  const { handleBlockUser, isLoading } = useBlockUser();

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
          onChange={(value) => handleBlockUser(userId, value.target.checked)}
        />
      )}
    </div>
  );
};
