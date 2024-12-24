"use client";
import { Loader, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useGetCurrentUser } from "@/entities/user";
import { TokenService } from "@/shared/lib/tokenService";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES, routesConfig } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useGetCurrentUser();
  const [isInitialized, setInitialized] = useState(false);
  const accessToken = TokenService.getAccessToken();

  const getPathWithoutLocale = useCallback(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const localePattern = /^[a-z]{2}$/;

    if (pathParts.length > 0 && localePattern.test(pathParts[0])) {
      pathParts.shift();
    }

    return "/" + pathParts.join("/");
  }, [pathname]);

  const checkAccess = useCallback(() => {
    const pathWithoutLocale = getPathWithoutLocale();
    const route = routesConfig.find((r) => r.path === pathWithoutLocale);
    console.log("check access", route);
    console.log("isInitialized", isInitialized);
    console.log("currentUser", currentUser.data);
    if (!route) {
      return true;
    }

    if (route.requiresAuth && !currentUser.isSuccess) {
      router.push(ROUTES.LOGIN);
      return false;
    }

    // TODO CHECK IS ADMIN
    if (route.isAdmin && (!currentUser.data || !currentUser.data.user)) {
      router.push(ROUTES.FORBIDDEN);
      return false;
    }

    return true;
  }, [
    currentUser.data,
    currentUser.isSuccess,
    getPathWithoutLocale,
    isInitialized,
    router,
  ]);

  useEffect(() => {
    if (!accessToken) {
      if (
        routesConfig.some(
          (r) => r.path === getPathWithoutLocale() && r.requiresAuth,
        )
      ) {
        router.push(ROUTES.LOGIN);
      }
      return;
    }

    if (currentUser.isSuccess) {
      authStore.login(currentUser.data.user ?? null);
    }

    if (!isInitialized && !currentUser.isLoading) {
      setInitialized(true);
    }

    if (isInitialized && currentUser.isError) {
      router.push(ROUTES.LOGIN);
    }

    if (isInitialized && currentUser.data) {
      checkAccess();
    }
  }, [
    currentUser.isSuccess,
    currentUser.isLoading,
    currentUser.isError,
    currentUser.data,
    isInitialized,
    router,
    pathname,
    checkAccess,
    accessToken,
    getPathWithoutLocale,
  ]);

  if (!isInitialized || currentUser.isLoading) {
    return (
      <div className="h-dvh flex items-center pt-8 flex-col">
        <Text>{t("please_wait_loading")}...</Text>
        <Loader width={60} height={60} />
      </div>
    );
  }

  return children;
};
