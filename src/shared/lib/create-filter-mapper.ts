type FilterMapper<T> = {
  toSearchParams: (filters: Partial<T>) => string;
  toFilters: (searchParams: URLSearchParams) => Partial<T>;
};

export const createFilterMapper = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
>(): FilterMapper<T> => {
  return {
    /**
     * Преобразует URLSearchParams в объект фильтров.
     * @param searchParams - текущие параметры поиска.
     * @returns Объект фильтров.
     */
    toFilters: (searchParams: URLSearchParams): Partial<T> => {
      const filters: Partial<T> = {};
      searchParams.forEach((value, key) => {
        // Если значение равно 'undefined' (пустое), превращаем его в null
        filters[key as keyof T] = (
          value === "true" ? true : value === "false" ? false : value
        ) as T[keyof T];
      });
      return filters;
    },

    /**
     * Преобразует объект фильтров в строку для URLSearchParams.
     * @param filters - объект фильтров.
     * @returns Строка запроса.
     */
    toSearchParams: (filters: Partial<T>): string => {
      const queryObject: Record<string, string> = Object.entries(filters)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== "",
        ) // Убираем undefined
        .reduce(
          (acc, [key, value]) => {
            acc[key] = String(value); // Преобразуем boolean и другие типы в строку
            return acc;
          },
          {} as Record<string, string>,
        );
      return new URLSearchParams(queryObject).toString();
    },
  };
};
