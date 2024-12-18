'use client';
import Cookies from "js-cookie";
import {  makeAutoObservable } from "mobx";
import { TokenService } from "@/shared/lib/tokenService";

interface User {
  name?: string;
  accessToken?:string | null;
  email: string;
}
class AuthStore {
  user: User | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== 'undefined') {

    }
     //this.syncWithCookies();


  }

  login(user: User | null) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    Cookies.remove('accessToken')
  }

  syncWithCookies() {
    const token = TokenService.getAccessToken();
    this.isAuthenticated = !!token;
  }
}

export const authStore = new AuthStore();
