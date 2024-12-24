import { AxiosError } from "axios";
import { User } from "@/shared/proto/user/v1/user";

export type RegisterReqT = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type RegisterErrorT = AxiosError<{ message: string }>;

export type LoginByEmailReqT = {
  email: string;
  password: string;
};

export type LoginByEmailResT = {
  user: User;
  accessToken: string;
};

export type LoginByEmailErrorT = AxiosError<{ message: string }>;
