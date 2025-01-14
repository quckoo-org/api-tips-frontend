import { GetUsersRequest } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export type UserRegistryFiltersT = Omit<GetUsersRequest, "page" | "pageSize">;
