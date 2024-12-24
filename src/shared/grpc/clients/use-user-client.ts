import { UserServiceDefinition } from "@/shared/proto/user/v1/user";
import { useGrpcClient } from "../useGrpcClient";

export const useUsersClient = () => {
  return useGrpcClient(UserServiceDefinition);
};
