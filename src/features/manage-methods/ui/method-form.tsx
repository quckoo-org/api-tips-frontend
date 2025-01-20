"use client";

import { Button, Flex, TextInput } from "@mantine/core";

import { clsx } from "clsx";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";
import { Method } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type MethodFormProps = {
  className?: string;
  method?: Method;
  onSuccess: (method: Method) => void;
  isLoading?: boolean;
};

export const MethodForm: FC<MethodFormProps> = ({
  className,
  onSuccess,
  method,
  isLoading,
}) => {
  const { t } = useTranslations();
  const defaultValues: Partial<Method> = {
    ...method,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Method>({
    defaultValues,
  });

  const onSubmit = (data: Method) => {
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <TextInput
          label={t("name")}
          placeholder={t("enter_name")}
          withAsterisk
          {...register("name", { required: t("name_is_required") })}
          error={errors.name?.message}
        />
        <Button type="submit" loading={isLoading}>
          {t("submit")}
        </Button>
      </Flex>
    </form>
  );
};
