import { User } from "@/shared/proto/api_tips_access/v1/api_tips_access";

export interface UserFormValues
  extends Omit<
    User,
    | "createdAt"
    | "verifiedAt"
    | "blockedAt"
    | "deletedAt"
    | "id"
    | "countryCode"
  > {
  cca3: string;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
}
