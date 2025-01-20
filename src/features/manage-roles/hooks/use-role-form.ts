import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Permission,
  Role,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useRoleModalForm = (
  roleForEdit: Role | undefined,
  permissions: Permission[] | undefined,
) => {
  const [searchPermissionInput, setSearchPermissionInput] =
    useState<string>("");
  const [roleTitle, setRoleTitle] = useState<string>("");
  const [rolePermissions, setRolePermissions] = useState<Permission[]>([]);
  const [formErrors, setFormErrors] = useState<{
    permissionsError: boolean;
    titleError: boolean;
  }>({ permissionsError: false, titleError: false });

  const restPermissions = useMemo(() => {
    const rolesPermissionsIds: number[] | undefined = rolePermissions?.map(
      (permission) => permission.id,
    );

    return permissions?.filter(
      (permission) => !rolesPermissionsIds?.includes(permission.id),
    );
  }, [permissions, rolePermissions]);

  useEffect(() => {
    if (!roleForEdit) {
      return;
    }

    setRoleTitle(roleForEdit?.name);
    setRolePermissions(roleForEdit.permissions);

    return () => setSearchPermissionInput("");
  }, [roleForEdit, setRolePermissions, setRoleTitle]);

  const handleAddPermissionTORole = (newPermission: Permission) => {
    setFormErrors((prevState) => ({ ...prevState, permissionsError: false }));
    setRolePermissions((prevState) => [newPermission, ...prevState]);
  };

  const handleRemovePermissionTORole = (permissionForRemove: Permission) => {
    setFormErrors((prevState) => ({ ...prevState, permissionsError: false }));
    setRolePermissions((prevState) =>
      prevState.filter(
        (permission) => permission.id !== permissionForRemove.id,
      ),
    );
  };

  const handleChangeSearchPermissionInput = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchPermissionInput(e.target.value);
  };

  const handleChangeRoleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevState) => ({ ...prevState, titleError: false }));
    setRoleTitle(e.target.value);
  };

  const handleAddCopiedPermissions = (savedPermissions: Permission[]) => {
    setRolePermissions(savedPermissions);
  };

  return {
    addPermissions: {
      searchPermissionInput,
      handleChangeSearchPermissionInput,
      handleAddPermissionTORole,
      handleAddCopiedPermissions,
    },
    deletePermissions: {
      restPermissions: restPermissions?.filter((permission) =>
        permission.name
          .toLowerCase()
          .includes(searchPermissionInput.toLowerCase()),
      ),
      handleRemovePermissionTORole,
    },
    roleTitle: {
      roleTitle,
      handleChangeRoleTitleInput,
    },
    rolePermissions: {
      rolePermissions: rolePermissions.filter((permission) =>
        permission.name
          .toLowerCase()
          .includes(searchPermissionInput.toLowerCase()),
      ),
      setRolePermissions,
    },
    formErrors: { formErrors, setFormErrors },
  };
};
