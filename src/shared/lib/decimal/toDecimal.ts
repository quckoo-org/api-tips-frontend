import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

export const toDecimal = (value: number | undefined): Decimal | undefined => {
  if (typeof value === "undefined") {
    return undefined;
  }

  const units = Math.trunc(value);
  const nanos = Math.round((value - units) * Math.pow(10, 9));

  return {
    units,
    nanos,
  };
};
