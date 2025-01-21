import { Decimal } from "@/shared/proto/custom_types/v1/decimal";

// Функция для преобразования числа в объект Decimal
export const toDecimal = (value: number | undefined): Decimal | undefined => {
  if (typeof value === "undefined") {
    return undefined;
  }

  const units = Math.trunc(value); // Получаем целую часть числа
  const nanos = Math.round((value - units) * Math.pow(10, 9)); // Получаем дробную часть в наносекундах

  return {
    units,
    nanos,
  };
};

// Функция для создания объекта Decimal по умолчанию
export const createDecimal = (): Decimal => {
  return { nanos: 0, units: 0 };
};

// Функция для преобразования объекта Decimal в число
export const fromDecimal = (money: Decimal | undefined, afterDecimal = 2) => {
  if (!money || (money.units === 0 && money.nanos === 0)) {
    return 0;
  }

  const nanoFactor = 1_000_000_000; // Фактор для преобразования наносекунд в дробную часть

  const resultNumber =
    money.units + parseFloat((money.nanos / nanoFactor).toFixed(afterDecimal)); // Объединяем units и nanos

  return resultNumber;
};

// Функция для умножения двух объектов Decimal
export const multiplyDecimal = (
  value1: Decimal | undefined,
  value2: Decimal | undefined,
): Decimal => {
  if (!value1 || !value2) {
    return { units: 0, nanos: 0 };
  }

  const multipliedValue = fromDecimal(value1) * fromDecimal(value2); // Умножаем два значения

  return toDecimal(multipliedValue) as Decimal; // Преобразуем результат обратно в объект Decimal
};

// Функция для вычитания одного объекта Decimal из другого
export const subtractionDecimal = (
  value1: Decimal | undefined,
  value2: Decimal | undefined,
): Decimal => {
  return {
    units: (value1?.units ?? 0) - (value2?.units ?? 0), // Вычитаем units
    nanos: (value1?.nanos ?? 0) - (value2?.nanos ?? 0), // Вычитаем nanos
  };
};

// Функция для суммирования двух или трех объектов Decimal
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
    +fromDecimal(value3).toFixed(afterDecimal); // Суммируем значения

  return toDecimal(+sumValue) as Decimal; // Преобразуем результат обратно в объект Decimal
};
