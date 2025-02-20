"use client";
import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import { ROLES } from "@/shared/lib";

export type UserResponse = {
  aud: string;
  cca3: string;
  email: string;
  exp: number;
  firstname: string;
  iss: string;
  jti: string;
  lastname: string;
  roles: string[];
  sub: string;
};

class AuthStore {
  user: UserResponse | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  login(user: UserResponse | null) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    Cookies.remove("jwt");
  }

  isAccess(rolesHasAccess: ROLES[] | string[]) {
    //проверка на массив
    const rolesForAccess = Array.isArray(rolesHasAccess)
      ? rolesHasAccess
      : [rolesHasAccess];
    const userRolesForAccess = Array.isArray(this.user?.roles)
      ? this.user?.roles
      : [this.user?.roles];
    return rolesForAccess?.length && this.user?.roles
      ? userRolesForAccess?.some((userRole) =>
          rolesForAccess.includes(userRole as ROLES),
        )
      : false;
  }
}

export const authStore = new AuthStore();
