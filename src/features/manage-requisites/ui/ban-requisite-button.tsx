import { Checkbox, Loader } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useBanRequisities } from "@/features/manage-requisites";

type BanRequisiteButtonProps = {
  className?: string;
  checked: boolean;
  requisiteId: number;
};

export const BanRequisiteButton: FC<BanRequisiteButtonProps> = ({
  className,
  checked,
  requisiteId,
}) => {
  const banRequisite = useBanRequisities();

  return (
    <div className={clsx("flex items-center relative", className)}>
      {banRequisite.isPending ? (
        <Loader size="xs" />
      ) : (
        <Checkbox
          disabled={banRequisite.isPending}
          checked={checked}
          onChange={(value) =>
            banRequisite.mutateAsync({
              requisiteId,
              isBanned: value.target.checked,
            })
          }
        />
      )}
    </div>
  );
};
