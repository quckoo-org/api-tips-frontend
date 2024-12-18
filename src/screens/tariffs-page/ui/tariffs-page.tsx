"use client";

import { ActionIcon, MenuItem, Pagination, Table, Title } from "@mantine/core";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { FC } from "react";
import { TariffRow, useGetTariffs } from "@/entities/tariff";
import {
  HideTariffButton,
  useCreateTariffModal,
  useUpdateTariffModal,
} from "@/features/manage-tariff";
import { usePagination } from "@/shared/hooks/use-pagination";
import { useTranslations } from "@/shared/locale/translations";
import { TariffsPageError } from "./tariffs-page-error";
import { TariffsPageSkeleton } from "./tariffs-page-skeleton";

type TariffPageProps = {
  className?: string;
};

export const TariffsPage: FC<TariffPageProps> = ({ className }) => {
  const crateModal = useCreateTariffModal();
  const updateModal = useUpdateTariffModal();
  const { t } = useTranslations();
  const pagination = usePagination();

  const tariffsQuery = useGetTariffs({
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const rows = tariffsQuery.data?.rows.map((tariff) => (
    <TariffRow
      key={tariff.id}
      tariff={tariff}
      actions={
        <>
          <MenuItem onClick={() => updateModal.updateTariff(tariff.id)}>
            {t("update_tariff")}
          </MenuItem>
        </>
      }
      renderHideTariff={(tariffId, checked) => (
        <HideTariffButton tariffId={tariffId} checked={checked} />
      )}
    />
  ));

  if (tariffsQuery.isLoading) {
    return <TariffsPageSkeleton className={className} />;
  }

  if (tariffsQuery.isError) {
    return <TariffsPageError className={className} />;
  }

  return (
    <>
      <div className={clsx("", className)}>
        <div className="flex gap-4 justify-between">
          <Title order={3} className="font-normal">
            {t("tariffs")}
          </Title>
          <ActionIcon onClick={crateModal.createTariff}>
            <PlusIcon />
          </ActionIcon>
        </div>
        <Table className="mb-4" striped highlightOnHover>
          <Table.Thead className="bg-primary-200">
            <Table.Tr>
              <Table.Th>{t("start_date")}</Table.Th>
              <Table.Th>{t("end_date")}</Table.Th>
              <Table.Th>{t("name")}</Table.Th>
              <Table.Th>{t("free_requests")}</Table.Th>
              <Table.Th>{t("paid_requests")}</Table.Th>
              <Table.Th>{t("total_requests")}</Table.Th>
              <Table.Th>{t("cost")}</Table.Th>
              <Table.Th>{t("total_cost")}</Table.Th>
              <Table.Th>{t("hidden")}</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          disabled={tariffsQuery.isPending}
          value={pagination.page}
          onChange={(page) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pagination.handlePageChange(page, tariffsQuery.data?.totalPages);
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          total={tariffsQuery.data?.totalPages ?? 0}
        />
      </div>
      {crateModal.modal}
      {updateModal.modal}
    </>
  );
};
