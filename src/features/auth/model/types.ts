import { AxiosError } from "axios";
import { User } from "@/shared/proto/api_tips_access/v1/api_tips_access";

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
  user: User;
  Jwt: string;
};

export type LoginByEmailErrorT = AxiosError<{ Message: string }>;
