import { RoleServiceDefinition } from "@/shared/proto/role/v1/role";
import { useGrpcClient } from "../useGrpcClient";

export const useRolesClient = () => {
  return useGrpcClient(RoleServiceDefinition);
};
