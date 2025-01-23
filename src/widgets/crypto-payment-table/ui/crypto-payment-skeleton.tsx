import { Skeleton } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";

type RolesTableSkeletonProps = {
  className?: string;
};

export const CryptoPaymentSkeleton: FC<RolesTableSkeletonProps> = ({
  className,
}) => {
  return (
    <div className={clsx("", className)}>
      <Skeleton height={52} mb="xs" />
      <Skeleton height={36} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
      <Skeleton height={101} mt={6} />
    </div>
  );
};
