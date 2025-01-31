export const enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  USER_REGISTRY = "/user-registry",
  REGISTER = "/register",
  VERIFY = "/verify",
  FORBIDDEN = "/forbidden",
  TARIFFS = "/tariffs",
  ORDERS = "/orders",
  ADMINISTRATION = "/administration",
  RESET = "/reset",
  FORGOT_PASSWORD = "/forgot-password",
  REQUISITES = "/requisites",
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
  {
    path: ROUTES.TARIFFS,
    requiresAuth: true,
    isAdmin: false,
  },
  {
    path: ROUTES.ORDERS,
    requiresAuth: true,
    isAdmin: true,
  },
  {
    path: ROUTES.ADMINISTRATION,
    requiresAuth: true,
    isAdmin: true,
  },
  {
    path: ROUTES.RESET,
    requiresAuth: false,
    isAdmin: false,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    requiresAuth: false,
    isAdmin: false,
  },
];
