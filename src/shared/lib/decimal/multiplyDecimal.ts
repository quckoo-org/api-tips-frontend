import { fromDecimal } from "@/shared/lib/decimal/fromDecimal";
import { toDecimal } from "@/shared/lib/decimal/toDecimal";
import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

export const multiplyDecimal = (
  value1: Decimal | undefined,
  value2: Decimal | undefined,
): Decimal => {
  if (!value1 || !value2) {
    return { units: 0, nanos: 0 };
  }

  const multipliedValue = fromDecimal(value1) * fromDecimal(value2);

  return toDecimal(multipliedValue) as Decimal;
};
