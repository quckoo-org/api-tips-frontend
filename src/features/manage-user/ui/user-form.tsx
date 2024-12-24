"use client";

import { Button, Checkbox, Flex, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { CountrySelect } from "@/entities/country";
import { useGetUser } from "@/features/manage-user/model/use-get-user";
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
  const userQuery = useGetUser({ userId });

  console.log(userQuery);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      isDeleted: false,
      isBlocked: false,
      isVerified: false,
      countryCode: "",
    },
    values: {
      email: userQuery.data?.user?.email ?? "",
      firstName: userQuery.data?.user?.firstName ?? "",
      lastName: userQuery.data?.user?.lastName ?? "",
      isDeleted: !!userQuery.data?.user?.deletedAt,
      isBlocked: !!userQuery.data?.user?.blockedAt,
      isVerified: !!userQuery.data?.user?.verifiedAt,
      countryCode: userQuery.data?.user?.countryCode,
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
          {...register("firstName")}
        />
        <TextInput
          label={t("last_name")}
          placeholder={t("enter_last_name")}
          {...register("lastName")}
        />
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChangeCountry={field.onChange}
            />
          )}
        />
        {userId && (
          <>
            <Checkbox label="Is Deleted" {...register("isDeleted")} />
            <Checkbox label="Is Blocked" {...register("isBlocked")} />
            <Checkbox label="Is Verified" {...register("isVerified")} />
          </>
        )}
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
