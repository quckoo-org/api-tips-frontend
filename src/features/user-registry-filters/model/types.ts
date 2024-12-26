import { GetAllUsersRequest } from "@/shared/proto/user/v1/user";

export type UserRegistryFiltersT = Omit<
  GetAllUsersRequest,
  "page" | "pageSize" | "isDeleted" | "isBlocked" | "isVerified"
> & {
  isBlocked: boolean | null;
  isDeleted: boolean | null;
  isVerified: boolean | null;
};
