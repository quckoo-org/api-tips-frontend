import { GetUsersRequest } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export type UserRegistryFiltersT = Omit<GetUsersRequest, "page" | "pageSize">;

export enum UserOrderBy {
  email = "email",
  first_name = "first_name",
  last_name = "last_name",
  cca3 = "cca3",
}
