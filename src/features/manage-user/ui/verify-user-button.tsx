import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useVerifyUser } from "../model/use-verify-user";

type VerifyUserButtonProps = {
  className?: string;
  checked: boolean;
  userId: number;
};

export const VerifyUserButton: FC<VerifyUserButtonProps> = ({
  className,
  checked,
  userId,
}) => {
  const { handleVerifyUser, isLoading } = useVerifyUser();

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
          onChange={(value) => handleVerifyUser(userId, value.target.checked)}
        />
      )}
    </div>
  );
};
