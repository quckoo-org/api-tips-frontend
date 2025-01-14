"use client";
import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import { TokenService } from "@/shared/lib/tokenService";
import { User } from "@/shared/proto/api_tips_access/v1/api_tips_access";

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
    Cookies.remove("jwt");
  }

  syncWithCookies() {
    const token = TokenService.getAccessToken();
    this.isAuthenticated = !!token;
  }
  setCurrentUser(currentUser: User) {
    this.user = currentUser;
    this.isAuthenticated = true;
  }
}

export const authStore = new AuthStore();
