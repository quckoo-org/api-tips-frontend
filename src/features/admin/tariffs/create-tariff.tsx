import React from "react";
import { Button, Input, Modal } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

const CreateTariff = () => {
  interface IFormInput {
    startDate: string,
    endDate: string,
    name: string,
    freeRequests: string,
    paidRequests: string,
    totalRequests: string,
    cost: string,
    totalCost: string,

  }

  /** Список элементов */
  type TListResponseData = Array<IFormInput>;

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<IFormInput>()

  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = (data: IFormInput) => {
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: async (addTariff: IFormInput) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(addTariff)
      return addTariff
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ['tariffs'],
        (oldData: TListResponseData) => [...oldData, newData],
      )
      close();
      reset();
      // console.log({my_on_success: data, addTariff: addTariff});
    },
  })

  return (
    <Modal opened={opened} onClose={close} title="Добавить тариф">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input.Wrapper label="Дата начала действия" description="Начало действия тарифа" error={false}>
          <Input {...register("startDate")} placeholder="00.00.0000" />
        </Input.Wrapper>
        <Input.Wrapper label="Дата окончания действия" description="Конец действия тарифа" error={false}>
          <Input {...register("endDate")} placeholder="00.00.0000" />
        </Input.Wrapper>
        <Input.Wrapper label="Название" description="Название тарифа" error={false}>
          <Input {...register("name")} placeholder="" />
        </Input.Wrapper>
        <Input.Wrapper label="Кол-во бесплатных запросов" description={false} error={false}>
          <Input {...register("freeRequests")} placeholder="" />
        </Input.Wrapper>
        <Input.Wrapper label="Кол-во оплаченных запросов" description={false} error={false}>
          <Input {...register("paidRequests")} placeholder="" />
        </Input.Wrapper>
        <Input.Wrapper label="Общее количество" description={false} error={false}>
          <Input {...register("totalRequests")} placeholder="" />
        </Input.Wrapper>
        <Input.Wrapper label="Стоимость 1 запроса" description={false} error={false}>
          <Input {...register("cost")} placeholder="" />
        </Input.Wrapper>
        <Input.Wrapper label="Общая стоимость" description={false} error={false}>
          <Input {...register("totalCost")} placeholder="" />
        </Input.Wrapper>

        <Button type="submit" mt="md">Создать</Button>
      </form>
    </Modal>
  );
};

export default CreateTariff;