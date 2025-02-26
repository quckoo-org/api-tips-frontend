import { ROLES } from "@/shared/lib";

export const enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  USER_REGISTRY = "/user-registry",
  REGISTER = "/register",
  VERIFY = "/verify",
  FORBIDDEN = "/forbidden",
  TARIFFS = "/tariffs",
  ORDERS = "/orders",
  MY_ORDERS = "/my-orders",
  ADMINISTRATION = "/administration",
  RESET = "/reset",
  FORGOT_PASSWORD = "/forgot-password",
  REQUISITES = "/requisites",
  INVOICES = "/invoices",
  HISTORIES = "/histories",
  PROFILE = "/profile",
  DASHBOARD = "/dashboard",
}

export const routesConfig: Array<{
  path: ROUTES;
  requiresAuth: boolean;
  isAdmin: boolean;
  roles?: ROLES[];
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
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.TARIFFS,
    requiresAuth: true,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.ORDERS,
    requiresAuth: true,
    isAdmin: true,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMINISTRATION,
    requiresAuth: true,
    isAdmin: true,
    roles: [ROLES.ADMIN],
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
  {
    path: ROUTES.INVOICES,
    requiresAuth: true,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.HISTORIES,
    requiresAuth: true,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.REQUISITES,
    requiresAuth: true,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.PROFILE,
    requiresAuth: true,
    isAdmin: false,
    roles: [ROLES.ADMIN, ROLES.WebUser, ROLES.MANAGER],
  },
  {
    path: ROUTES.MY_ORDERS,
    requiresAuth: true,
    isAdmin: false,
    roles: [ROLES.ADMIN, ROLES.WebUser, ROLES.MANAGER],
  },
];
