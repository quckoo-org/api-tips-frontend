import { useGrpcClient } from "../useGrpcClient";
//import { RoleServiceDefinition } from "@/shared/proto/role/v1/role";

export const useRolesClient = () => {
  return useGrpcClient({});
};
