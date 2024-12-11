"use client";

import { Button, Checkbox, Flex, TextInput } from "@mantine/core";
import { clsx } from "clsx";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { CountrySelect } from "@/entities/country";
import { RolesMultiSelect } from "@/entities/role";
import { User } from "@/shared/proto/user/v1/user";
import { UserFormValues } from "../model/types";

type UserFormProps = {
  className?: string;
  userId?: number;
  onSuccess: (user: User) => void;
};

export const UserForm: FC<UserFormProps> = ({
  className,
  onSuccess,
  userId,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      email: "",
      name: "",
      lastname: "",
      token: "",
      countryId: null,
      isDeleted: false,
      isBlocked: false,
      isHidden: false,
      lastIp: "",
      isVerified: false,
      createdAt: undefined,
      roles: [],
    },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
    console.log(userId);
    //req
    const user = {} as User;
    onSuccess(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <TextInput
          label="Email"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <TextInput
          label="Name"
          placeholder="Enter first name"
          {...register("name")}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter last name"
          {...register("lastname")}
        />
        <TextInput
          label="Token"
          placeholder="Enter token"
          {...register("token")}
        />
        <Controller
          name="countryId"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChangeCountry={field.onChange}
            />
          )}
        />
        <Checkbox label="Is Deleted" {...register("isDeleted")} />
        <Checkbox label="Is Blocked" {...register("isBlocked")} />
        <Checkbox label="Is Hidden" {...register("isHidden")} />
        <TextInput
          label="Last IP"
          placeholder="Enter last IP"
          {...register("lastIp")}
        />
        <Checkbox label="Is Verified" {...register("isVerified")} />
        {/* <Controller
          name="roles"
          control={control}
          rules={{ required: "At least one role is required" }}
          render={({ field }) => (
            <MultiSelect
              label="Roles"
              placeholder="Select roles"
              data={roles}
              {...field} // Передаем все необходимые пропсы в MultiSelect
              error={errors.roles?.message}
            />
          )}
        /> */}
        <Controller
          name="roles"
          control={control}
          rules={{ required: "At least one role is required" }}
          render={({ field }) => (
            <RolesMultiSelect
              value={field.value}
              onChangeRole={field.onChange}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </Flex>
    </form>
  );
};
