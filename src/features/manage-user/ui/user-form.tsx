"use client";

import { Button, Checkbox, Flex, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "@/shared/locale/translations";
import { UserFormValues } from "../model/types";

type UserFormProps = {
  className?: string;
  userId?: number;
  onSuccess: (user: UserFormValues) => Promise<void>;
};

export const UserForm: FC<UserFormProps> = ({
  className,
  onSuccess,
  userId,
}) => {
  const { t } = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      email: "",
      fistName: "",
      lastName: "",
      isDeleted: false,
      isBlocked: false,
      isVerified: false,
      cca3: "",
    },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
    console.log(userId);
    onSuccess(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <TextInput
          label={t("email")}
          placeholder={t("enter_email")}
          {...register("email", { required: t("email_is_required") })}
          error={errors.email?.message}
        />
        <TextInput
          label={t("first_name")}
          placeholder={t("enter_first_name")}
          {...register("fistName")}
        />
        <TextInput
          label={t("last_name")}
          placeholder={t("enter_last_name")}
          {...register("lastName")}
        />
        {/* <Controller
          name="countryId"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChangeCountry={field.onChange}
            />
          )}
        /> */}
        <Checkbox label="Is Deleted" {...register("isDeleted")} />
        <Checkbox label="Is Blocked" {...register("isBlocked")} />
        <Checkbox label="Is Verified" {...register("isVerified")} />
        {/* <Controller
          name="roles"
          control={control}
          rules={{ required: "At least one role is required" }}
          render={({ field }) => (
            <RolesMultiSelect
              value={field.value}
              onChangeRole={field.onChange}
            />
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
