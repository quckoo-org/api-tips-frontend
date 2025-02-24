import { UserResponse } from "@/shared/stores/AuthStore";

export const useGetCurrentUser = (token: string | undefined): UserResponse => {
  // decode the logged in user
  function parseJwt(token: string | undefined) {
    if (!token) {
      return;
    }

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");

    const user = JSON.parse(window.atob(base64));
    return user;
  }

  // loggedin user
  const user = parseJwt(token);

  return user;
};
