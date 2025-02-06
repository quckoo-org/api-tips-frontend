import { AxiosError } from "axios";
import { UserResponse } from "@/shared/stores/AuthStore";

export type RegisterReqT = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  cca3: string;
};

export type RegisterErrorT = AxiosError<{ Message: string }>;

export type LoginByEmailReqT = {
  email: string;
  password: string;
};

export type LoginByEmailResT = {
  user: UserResponse;
  Jwt: string;
};

export type LoginByEmailErrorT = AxiosError<{ Message: string }>;

export type RecoveryPasswordReqT = { email: string };
export type RecoveryPasswordResT = { message: string };
export type RecoveryPasswordErrorT = AxiosError<{ Message: string }>;

export type RecoveryCodeReqT = { email: string; code: string };
export type RecoveryCodedResT = { Message: string; Code: string };
export type RecoveryCodeErrorT = AxiosError<{ Message: string }>;

export type ChangePasswordReqT = {
  password: string;
  code: string;
  email: string;
};
export type ChangePasswordResT = { message: string };
export type ChangePasswordErrorT = AxiosError<{ Message: string }>;
export type ChangePasswordFormValuesT = Pick<ChangePasswordReqT, "password">;
