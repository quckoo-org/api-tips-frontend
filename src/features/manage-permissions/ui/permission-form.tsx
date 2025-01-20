"use client";

import { Button, Flex, TextInput } from "@mantine/core";

import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { MethodsMultiSelect } from "@/entities/methods";
import { useTranslations } from "@/shared/locale/translations";
import { Permission } from "@/shared/proto/api_tips_access/v1/api_tips_access";

type PermissionFormProps = {
  className?: string;
  permission?: Permission;
  onSuccess: (permission: Permission) => void;
  isLoading?: boolean;
};

export const PermissionForm: FC<PermissionFormProps> = ({
  className,
  onSuccess,
  permission,
  isLoading,
}) => {
  const { t } = useTranslations();
  const defaultValues: Partial<Permission> = {
    ...permission,
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Permission>({
    defaultValues,
  });

  const onSubmit = (data: Permission) => {
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

        <Controller
          name="methods"
          control={control}
          rules={{ required: t("methods_is_required") }}
          render={({ field }) => (
            <MethodsMultiSelect
              onChangeMethod={field.onChange}
              value={field.value}
              error={errors.methods?.message}
            />
          )}
        />
        <Button type="submit" loading={isLoading}>
          {t("submit")}
        </Button>
      </Flex>
    </form>
  );
};
