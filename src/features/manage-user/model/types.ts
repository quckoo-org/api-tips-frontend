import { User } from "@/shared/proto/user/v1/user";

export interface UserFormValues
  extends Omit<
    User,
    "createdAt" | "verifiedAt" | "blockedAt" | "deletedAt" | "id"
  > {
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
}
