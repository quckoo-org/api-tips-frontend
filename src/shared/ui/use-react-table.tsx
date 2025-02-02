import { Icon, IconProps, IconSelector } from "@tabler/icons-react";
import {
  useMantineReactTable,
  MRT_TableOptions,
  MRT_RowData,
} from "mantine-react-table";
import { JSX, RefAttributes } from "react";

export function useReactTable<TData extends MRT_RowData>(
  tableOptions: MRT_TableOptions<TData>,
) {
  return useMantineReactTable<TData>({
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    enableColumnActions: false,
    enableRowActions: true,
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    enableColumnDragging: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    filterFromLeafRows: false,
    enableTopToolbar: false,
    icons: {
      ...tableOptions.icons,
      IconSortAscending: (
        props: JSX.IntrinsicAttributes & IconProps & RefAttributes<Icon>,
      ) => <IconSelector {...props} />,
      IconSortDescending: (
        props: JSX.IntrinsicAttributes & IconProps & RefAttributes<Icon>,
      ) => <IconSelector {...props} />,
      IconArrowsSort: (
        props: JSX.IntrinsicAttributes & IconProps & RefAttributes<Icon>,
      ) => <IconSelector {...props} />,
    },
    initialState: { ...tableOptions.initialState, density: "xs" },
    ...tableOptions,
  });
}
