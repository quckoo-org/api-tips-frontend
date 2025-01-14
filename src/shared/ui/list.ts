import { ReactNode } from "react";

interface ListProps<T> {
  items: T[] | undefined;
  // eslint-disable-next-line
  itemToRender: (item: T, index: number, props: any) => ReactNode;
  page?: number;
  pageSize?: number;
}

const List = <T>({
  items,
  itemToRender,
  page = 1,
  pageSize = 10,
  ...props
}: ListProps<T>) => {
  if (!items?.length) return [];
  if (page && pageSize) {
    return items
      .slice(page * pageSize - pageSize, page * pageSize)
      .map((item, index) => itemToRender(item as T, index, props));
  }
  return items.map((item, index) => itemToRender(item, index, props));
};

export default List;
