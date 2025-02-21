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
  roles: ROLES[];
}> = [
  {
    path: ROUTES.HOME,
    requiresAuth: false,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.LOGIN,
    requiresAuth: false,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.REGISTER,
    requiresAuth: false,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.VERIFY,
    requiresAuth: false,
    isAdmin: false,
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.FORBIDDEN,
    requiresAuth: false,
    isAdmin: false,
    roles: [ROLES.ADMIN],
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
    roles: [ROLES.ADMIN],
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    requiresAuth: false,
    isAdmin: false,
    roles: [ROLES.ADMIN],
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
];
