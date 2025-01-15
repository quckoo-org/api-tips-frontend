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
  const currentUser = useGetCurrentUser(TokenService.getAccessToken());
  const [isInitialized, setIsInitialized] = useState(true);
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

    if (!route) {
      router.push(ROUTES.HOME);
      setIsInitialized(true);
      return false;
    }

    if (route.requiresAuth && !accessToken) {
      router.push(ROUTES.LOGIN);
      setIsInitialized(true);
      return false;
    }

    // TODO CHECK IS ADMIN
    // if (route.isAdmin && (!currentUser.data || !currentUser.data.user)) {
    //   router.push(ROUTES.FORBIDDEN);
    //   return false;
    // }
    setIsInitialized(true);
    return true;
  }, [accessToken, getPathWithoutLocale, router]);

  useEffect(() => {
    if (!accessToken) {
      TokenService.refreshToken();
    }

    if (currentUser) {
      authStore.login(currentUser ?? null);
    }

    if (!isInitialized) {
      setIsInitialized(true);
    }
    if (isInitialized && currentUser) {
      checkAccess();
    }
  }, [isInitialized, router, pathname, accessToken, currentUser, checkAccess]);

  if (!isInitialized) {
    return (
      <div className="h-dvh flex items-center pt-8 flex-col">
        <Text>{t("please_wait_loading")}...</Text>
        <Loader width={60} height={60} />
      </div>
    );
  }

  return children;
};
