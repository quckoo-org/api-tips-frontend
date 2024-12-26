export type UserT = {
  id: number;
  token: string;
  name: string;
  lastName: string;
  email: string;
  country: string;
  isDeleted: boolean;
  isBlocked: boolean;
  isHidden: boolean;
  createdAt: string;
  roles: { id: number; label: string }[];
  lastIp: string;
  isVerified: boolean;
};
