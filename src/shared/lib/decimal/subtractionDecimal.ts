import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

export const subtractionDecimal = (
  value1: Decimal | undefined,
  value2: Decimal | undefined,
): Decimal => {
  return {
    units: (value1?.units ?? 0) - (value2?.units ?? 0),
    nanos: (value1?.nanos ?? 0) - (value2?.nanos ?? 0),
  };
};
