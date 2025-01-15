import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

export const createDecimal = (): Decimal => {
  return { nanos: 0, units: 0 };
};
