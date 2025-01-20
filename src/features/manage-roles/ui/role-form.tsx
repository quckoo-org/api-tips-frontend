"use client";

import {
  ActionIcon,
  Button,
  Flex,
  Loader,
  Text,
  TextInput,
} from "@mantine/core";
import { clsx } from "clsx";
import { Minus, Plus } from "lucide-react";
import React, { FC } from "react";
import { useRoleModalForm } from "@/features/manage-roles/hooks/use-role-form";
import { useTranslations } from "@/shared/locale/translations";
import {
  Permission,
  Role,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

//TODO: save permissions
interface BaseRoleModalFormProps {
  className?: string;
  role?: Role;
  onSuccess: (role: Omit<Role, "id">) => void;
  isLoading?: boolean;
  permissions: Permission[] | undefined;
}
interface EditRoleProps extends BaseRoleModalFormProps {
  role: Role;
  //onSavePermissions: (savedPermissions: Permission[]) => void;
  //savedPermissions?: never;
}

interface AddRoleProps extends BaseRoleModalFormProps {
  role?: undefined;
  //savedPermissions: Permission[];
  //onSavePermissions?: never;
}

type RoleModalFormProps = EditRoleProps | AddRoleProps;

export const RoleForm: FC<RoleModalFormProps> = ({
  className,
  onSuccess,
  role,
  isLoading,
  permissions,
  // onSavePermissions,
  // savedPermissions,
}) => {
  const { t } = useTranslations();
  const {
    addPermissions: {
      searchPermissionInput,
      handleChangeSearchPermissionInput,
      handleAddPermissionTORole,
      // handleAddCopiedPermissions,
    },
    deletePermissions: { restPermissions, handleRemovePermissionTORole },
    roleTitle: { roleTitle, handleChangeRoleTitleInput },
    rolePermissions: { rolePermissions },
    formErrors: { setFormErrors, formErrors },
  } = useRoleModalForm(role, permissions);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //Проверка на наличие разрешений
    if (!rolePermissions.length) {
      setFormErrors((prevState) => ({ ...prevState, permissionsError: true }));
    }
    //Проверка на наличие названия роли
    if (!roleTitle) {
      setFormErrors((prevState) => ({ ...prevState, titleError: true }));
    }
    if (formErrors.permissionsError || formErrors.titleError) return;
    setFormErrors({ permissionsError: false, titleError: false });
    const data: Omit<Role, "id"> = {
      name: roleTitle,
      permissions: rolePermissions,
    };
    onSuccess(data);
  };
  return (
    <form className={clsx("", className)}>
      <Flex direction="column" gap="md">
        <div>
          <div>
            {role ? (
              <p>{role?.name}</p>
            ) : (
              <TextInput
                id="role-title"
                label={t("role_title")}
                value={roleTitle}
                onChange={handleChangeRoleTitleInput}
                placeholder={t("role_title_placeholder")}
                error={formErrors.titleError && t("role_title_required")}
              />
            )}
            <TextInput
              id="edit-role-permissons-list"
              label={t("search_permission")}
              value={searchPermissionInput}
              onChange={handleChangeSearchPermissionInput}
              placeholder={t("search_permission_placeholder")}
            />
          </div>
          <Flex direction="row" gap="md" className={"mt-4"}>
            <div className={"w-1/2"}>
              {role && role.name ? (
                <div>
                  <span>{role.name + t("role_permissions")} </span>
                  {/*<Button*/}
                  {/*  size="sm"*/}
                  {/*  onClick={() =>*/}
                  {/*    onSavePermissions && onSavePermissions(rolePermissions)*/}
                  {/*  }*/}
                  {/*/>*/}
                </div>
              ) : (
                <div>
                  <span>{t("new_role_permissions")}</span>
                  {/* <Button*/}
                  {/*  size="sm"*/}
                  {/*  onClick={() =>*/}
                  {/*    handleAddCopiedPermissions(savedPermissions!)*/}
                  {/*  }*/}
                  {/*/>*/}
                </div>
              )}
              <Flex
                direction="column"
                gap="md"
                className={" overflow-auto "}
                style={{ maxHeight: "400px" }}
              >
                {!!rolePermissions?.length &&
                  rolePermissions.map((permission) => (
                    <Flex gap={"sm"} key={permission.id}>
                      <ActionIcon
                        size="sm"
                        aria-label="Gradient action icon"
                        onClick={() => handleRemovePermissionTORole(permission)}
                      >
                        <Minus />
                      </ActionIcon>
                      <span>{permission.name}</span>
                    </Flex>
                  ))}
              </Flex>
            </div>
            <div className={"w-1/2"}>
              <p>{t("rest_role_permissions")}</p>
              <Flex
                direction="column"
                gap="md"
                className={" w-ful overflow-auto"}
                style={{ maxHeight: "400px" }}
              >
                {isLoading && <Loader />}
                {!!restPermissions?.length &&
                  restPermissions.map((restPermission) => (
                    <Flex gap={"sm"} key={restPermission.id}>
                      <ActionIcon
                        size="sm"
                        aria-label="Gradient action icon"
                        onClick={() =>
                          handleAddPermissionTORole(restPermission)
                        }
                      >
                        <Plus />
                      </ActionIcon>

                      <span className="role-modal__body__delete-permissions__edit-list__item__per-name">
                        {restPermission.name}
                      </span>
                    </Flex>
                  ))}
              </Flex>
            </div>
          </Flex>
        </div>
        <Button type="submit" loading={isLoading} onClick={onSubmit}>
          {t("submit")}
        </Button>
        {formErrors.permissionsError && (
          <Text className="text-center text-sm text-red-600">
            {t("role_permissions_required")}
          </Text>
        )}
      </Flex>
    </form>
  );
};
