"use client";

import { ActionIcon, MenuItem, Pagination, Table } from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC, useState } from "react";

import { MethodRow, useGetMethods } from "@/entities/methods";
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
import List from "@/shared/ui/list";
import { MethodsTableSkeleton } from "./methods-table-skeleton";

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

  const filteredMethods = methodsQuery.data?.methods.filter((method) => {
    if (filtersResult.search) {
      return method.name
        .toLowerCase()
        .includes(filtersResult.search.toLowerCase());
    }
    return true;
  });

  const rows = (
    <List
      page={pagination.page}
      pageSize={pagination.pageSize}
      items={filteredMethods}
      itemToRender={(method) => (
        <MethodRow
          key={method.id}
          method={method}
          actions={
            <>
              <MenuItem onClick={() => updateModal.updateMethod(method)}>
                {t("update_method")}
              </MenuItem>
              <MenuItem onClick={() => deleteMethod.deleteMethod(method)}>
                {t("delete_method")}
              </MenuItem>
            </>
          }
        />
      )}
    />
  );

  const handleSubmitFilters = (data: MethodsTableFiltersT) => {
    pagination.handlePageChange(1, pagination.pageSize);
    setFiltersResult(data);
  };

  if (methodsQuery.isLoading) {
    return <MethodsTableSkeleton className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex justify-end mt-4 mb-2 items-center">
          <MethodTableFilters
            onSubmit={handleSubmitFilters}
            result={filtersResult}
          />
          <ActionIcon onClick={crateModal.createMethod}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <Table.Th>{t("method_name")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          disabled={methodsQuery.isPending}
          value={pagination.page}
          onChange={(page) => {
            pagination.handlePageChange(page, pagination.totalPages);
          }}
          total={pagination.totalPages ?? 0}
        />
      </div>
      {crateModal.modal}
      {updateModal.modal}
      {deleteMethod.modal}
    </>
  );
};
