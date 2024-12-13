import { makeAutoObservable } from 'mobx';

interface User {
  name?: string;
  accessToken?:string;
  email: string;
}
class AuthStore {
  user: User | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(user: User | null) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    localStorage?.removeItem('accessToken')
  }
}

export const authStore = new AuthStore();
