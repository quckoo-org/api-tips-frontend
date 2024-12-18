import { GetAllUsersRequest } from "@/shared/proto/user/v1/user";

export type UserRegistryFiltersT = Omit<
  GetAllUsersRequest,
  "page" | "pageSize"
>;
