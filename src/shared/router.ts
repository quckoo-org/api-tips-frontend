export const enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  USER_REGISTRY = "/user-registry",
  REGISTER = "/register",
  VERIFY = "/verify",
  FORBIDDEN = "/forbidden",
}

export const routesConfig: Array<{
  path: ROUTES;
  requiresAuth: boolean;
  isAdmin: boolean;
}> = [
  {
    path: ROUTES.HOME,
    requiresAuth: false,
    isAdmin: false,
  },
  {
    path: ROUTES.LOGIN,
    requiresAuth: false,
    isAdmin: false,
  },
  {
    path: ROUTES.REGISTER,
    requiresAuth: false,
    isAdmin: false,
  },
  {
    path: ROUTES.VERIFY,
    requiresAuth: false,
    isAdmin: false,
  },
  {
    path: ROUTES.FORBIDDEN,
    requiresAuth: false,
    isAdmin: false,
  },
  {
    path: ROUTES.USER_REGISTRY,
    requiresAuth: true,
    isAdmin: false,
  },
];
