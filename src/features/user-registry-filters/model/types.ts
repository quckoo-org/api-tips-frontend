import { ListUsersRequest } from "@/shared/proto/user/v1/user";

export type UserRegistryFiltersT = Omit<ListUsersRequest, "page" | "pageSize">;
