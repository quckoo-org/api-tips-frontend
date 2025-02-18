import { Table } from "@mantine/core";
import { SortAsc, SortDesc } from "lucide-react";
import { ReactNode } from "react";
import { OrderDirection, SortItemT } from "@/shared/hooks/use-sort";

type SortThProps<T> = {
  onSort: (value: SortItemT<T>) => void;
  order: OrderDirection | null;
  children: ReactNode;
  value: T;
};

export const SortTh = <T,>({
  onSort,
  value,
  order,
  children,
}: SortThProps<T>) => {
  const handleSort = () => {
    onSort({ value: value });
  };

  return (
    <Table.Th onClick={handleSort}>
      <div className="flex gap-x-2">
        {order === "asc" && <SortAsc />}
        {order === "desc" && <SortDesc />}
        {children}
      </div>
    </Table.Th>
  );
};
