import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

export const fromDecimal = (money: Decimal | undefined, afterDecimal = 9) => {
  if (!money || (money.units === 0 && money.nanos === 0)) {
    return 0;
  }

  const nanoFactor = 1_000_000_000;

  // if (money.units === 88) {
  //   console.log(
  //     money.units,
  //     money.nanos / nanoFactor,
  //     (money.units + money.nanos / nanoFactor).toFixed(2),
  //
  //   );
  // }

  const resultNumber =
    money.units + parseFloat((money.nanos / nanoFactor).toFixed(afterDecimal));

  return resultNumber;
};
