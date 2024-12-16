"use client"

import { Table } from '@mantine/core';
import { Modal, Button } from '@mantine/core';
import { Input } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from "clsx";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type TariffsProps = {
  className?: string;
};

export const Tariffs: FC<TariffsProps> = ({ className }) => {

  const fetchAllTariffs = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = [
      { startDate: '01.01.2001', endDate: '01.03.2001', name: 'Название тарифа 1', freeRequests: 10, paidRequests: 90, totalRequests: 100, cost: 0.1, totalCost: 100 },
      { startDate: '01.01.2001', endDate: '01.03.2001', name: 'Название тарифа 2', freeRequests: 10, paidRequests: 90, totalRequests: 100, cost: 0.1, totalCost: 100 },
      { startDate: '01.01.2001', endDate: '01.03.2001', name: 'Название тарифа 3', freeRequests: 10, paidRequests: 90, totalRequests: 100, cost: 0.1, totalCost: 100 },
    ];

    return data;
  }

  const res = useQuery({ queryKey: ['tariffs'], queryFn: fetchAllTariffs })





  console.log({ simpleData: res.data });


  const rows = res.data?.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.startDate}</Table.Td>
      <Table.Td>{element.endDate}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.freeRequests}</Table.Td>
      <Table.Td>{element.paidRequests}</Table.Td>
      <Table.Td>{element.totalRequests}</Table.Td>
      <Table.Td>{element.cost}</Table.Td>
      <Table.Td>{element.totalCost}</Table.Td>
      <Table.Td>Редактировать</Table.Td>
    </Table.Tr>
  ));



  const [editTariffModalOpened, editTariffHandlers] = useDisclosure(false);




  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   console.log(data);
  //   await mutation.mutateAsync(data)
  // }



  return (
    <div className={clsx("p-10", className)}>
      <Button onClick={handlers.open}>Добавить тариф</Button>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Дата начала действия</Table.Th>
            <Table.Th>Дата окончания действия</Table.Th>
            <Table.Th>Название</Table.Th>
            <Table.Th>Кол-во бесплатных запросов</Table.Th>
            <Table.Th>Кол-во оплаченных запросов</Table.Th>
            <Table.Th>Общее количество</Table.Th>
            <Table.Th>Стоимость 1 запроса</Table.Th>
            <Table.Th>Общая стоимость</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

    </div>
  );
};
