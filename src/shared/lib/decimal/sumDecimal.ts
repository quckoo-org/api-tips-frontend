import { fromDecimal } from "@/shared/lib/decimal/fromDecimal";
import { toDecimal } from "@/shared/lib/decimal/toDecimal";
import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

export const sumDecimal = (
  value1: Decimal | undefined,
  value2: Decimal | undefined,
  value3?: Decimal | undefined,
  afterDecimal: number = 2,
): Decimal => {
  if (!value1 && !value2 && !value3) {
    return { units: 0, nanos: 0 };
  }

  if (!value1 && value2 && !value3) {
    return value2;
  }

  if (!value2 && value1 && !value3) {
    return value1;
  }

  if (!value2 && !value1 && value3) {
    return value3;
  }

  const sumValue =
    +fromDecimal(value1).toFixed(afterDecimal) +
    +fromDecimal(value2).toFixed(afterDecimal) +
    +fromDecimal(value3).toFixed(afterDecimal);

  return toDecimal(+sumValue) as Decimal;
};
