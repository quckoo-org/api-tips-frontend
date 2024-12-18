import { useState } from "react";

export type SortItemT<T> = {
  label: string;
  value: T;
  id: number;
};

export type OrderType = "asc" | "desc";
export type SortValueT<T> = { value: T; order: OrderType };

// Хук для сортировки в него нужно передать тип который будет содержать варианты строк с сортировкой.
// Создать массив вариантов сортировки и тоже прокинуть туда тип
// const SORTS_VARIANTS: SortItemT<SearchConstructorResponsesOrdering>[] = [
//   { id: 1, value: "preliminary_price", label: "По цене" },
//   { id: 2, value: "rating", label: "По рейтингу" },
//   { id: 3, value: "preliminary_time", label: "По времени работы" },
// ];
//sortValue & handleChangeSort & SORTS_VARIANTS прокидываем в SortButtons
export const useSort = <T>() => {
  const [sortValue, setSortValue] = useState<SortValueT<T> | null>(null);

  const handleChangeSort = (item: SortItemT<T>) => {
    if (!sortValue) {
      setSortValue({ value: item.value, order: "asc" });
      return;
    }

    if (sortValue.value === item.value) {
      setSortValue({
        value: item.value,
        order: sortValue.order === "asc" ? "desc" : "asc",
      });
      return;
    }

    setSortValue({ value: item.value, order: "asc" });
  };

  return {
    sortValue,
    handleChangeSort,
  };
};
