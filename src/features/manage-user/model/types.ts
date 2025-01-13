import { User } from "@/shared/proto/user/v1/user";

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
  countryCode: string;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
}
