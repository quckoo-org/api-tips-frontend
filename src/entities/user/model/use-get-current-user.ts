export const useGetCurrentUser = (token: string | undefined) => {
  // decode the logged in user
  function parseJwt(token: string | undefined) {
    if (!token) {
      return;
    }

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  const user = parseJwt(token);
  console.log(user);

  return user;
};
