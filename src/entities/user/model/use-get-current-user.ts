export const useGetCurrentUser = (token: string | undefined) => {
  // decode the logged in user
  console.log(token);
  function parseJwt(token: string | undefined) {
    if (!token) {
      return;
    }

    const base64Url = token.split(".")[1];
    console.log(base64Url);
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  const user = parseJwt(token);
  return user;
};
