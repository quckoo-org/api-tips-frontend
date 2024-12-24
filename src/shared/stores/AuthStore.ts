"use client";
import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import { TokenService } from "@/shared/lib/tokenService";
import { User } from "@/shared/proto/user/v1/user";


class AuthStore {
  user: User | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

  }

  login(user: User | null) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    Cookies.remove("accessToken");
  }

  syncWithCookies() {
    const token = TokenService.getAccessToken();
    this.isAuthenticated = !!token;
  }
  setCurrentUser(currentUser: User) {
    console.log(currentUser, this.user, 'asdsad');
    this.user = currentUser;
    this.isAuthenticated = true;

  }
}

export const authStore = new AuthStore();
