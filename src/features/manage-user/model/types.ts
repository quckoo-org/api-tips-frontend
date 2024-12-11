export type UserFormValues = {
  email: string;
  name?: string;
  lastname?: string;
  token?: string;
  countryId?: number | null;
  isDeleted: boolean;
  isBlocked: boolean;
  isHidden: boolean;
  lastIp?: string;
  isVerified: boolean;
  createdAt?: Date;
  roles: string[];
};
