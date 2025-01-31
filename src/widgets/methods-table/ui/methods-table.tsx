"use client";

import { Button, Title } from "@mantine/core";
import clsx from "clsx";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { FC, useMemo, useState } from "react";

import { useGetMethods } from "@/entities/methods";
import {
  useCreateMethodModal,
  useDeleteMethodModal,
  useUpdateMethodModal,
} from "@/features/manage-methods";
import {
  MethodsTableFiltersT,
  MethodTableFilters,
} from "@/features/methods-table-filters";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslations } from "@/shared/locale/translations";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";
import { useReactTable } from "@/shared/ui/use-react-table";

type MethodPageProps = {
  className?: string;
};

export const MethodsTable: FC<MethodPageProps> = ({ className }) => {
  const crateModal = useCreateMethodModal();
  const updateModal = useUpdateMethodModal();
  const deleteMethod = useDeleteMethodModal();
  const { t } = useTranslations();
  const [filtersResult, setFiltersResult] = useState<MethodsTableFiltersT>({
    search: "",
  });
  const methodsQuery = useGetMethods();
  const pagination = usePagination(methodsQuery.data?.methods.length, 15);

  const filteredMethods = useMemo(
    () =>
      methodsQuery.data?.methods.filter((method) => {
        if (filtersResult.search) {
          return method.name
            .toLowerCase()
            .includes(filtersResult.search.toLowerCase());
        }
        return true;
      }),
    [filtersResult.search, methodsQuery.data?.methods],
  );

  const columns = useMemo<MRT_ColumnDef<Method>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("name"),
        sortingFn: "alphanumeric",
        grow: 1,
      },
    ],
    [t],
  );

  const table = useReactTable({
    columns,
    data: filteredMethods ?? [],
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: t("actions"),
      },
    },
    renderRowActions: ({ cell }) => (
      <div className="flex gap-x-4">
        <Button
          onClick={() => updateModal.updateMethod(cell.row.original)}
          color="gray"
          variant="outline"
          size="xs"
        >
          {t("update")}
        </Button>
        <Button
          onClick={() => deleteMethod.deleteMethod(cell.row.original)}
          color="gray"
          variant="outline"
          size="xs"
        >
          {t("delete")}
        </Button>
      </div>
    ),
    state: {
      isLoading: methodsQuery.isLoading,
    },
    defaultColumn: {
      maxSize: 200,
      size: 140,
    },
  });

  const handleSubmitFilters = (data: MethodsTableFiltersT) => {
    pagination.handlePageChange(1, pagination.pageSize);
    setFiltersResult(data);
  };

  return (
    <>
      <div className={clsx("", className)}>
        <Title size="h1" className="mb-6">
          {t("methods")}
        </Title>
        <div className="flex justify-end mb-6 items-center">
          <MethodTableFilters
            onSubmit={handleSubmitFilters}
            result={filtersResult}
            className="grow"
          />
          <Button size="sm" onClick={crateModal.createMethod}>
            {t("create_method")}
          </Button>
        </div>
        <MantineReactTable table={table} />
      </div>
      {crateModal.modal}
      {updateModal.modal}
      {deleteMethod.modal}
    </>
  );
};
