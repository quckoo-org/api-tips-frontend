"use client";
import { Loader, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useGetCurrentUser } from "@/entities/user";
import { TokenService } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES, routesConfig } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string | undefined>(
    TokenService.getAccessToken(),
  );
  const currentUser = useGetCurrentUser(TokenService.getAccessToken());
  const [isInitialized, setIsInitialized] = useState(true);

  const getPathWithoutLocale = useCallback(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const localePattern = /^[a-z]{2}$/;

    if (pathParts.length > 0 && localePattern.test(pathParts[0])) {
      pathParts.shift();
    }

    return "/" + pathParts.join("/");
  }, [pathname]);

  const checkAccess = useCallback(
    (accessToken?: string) => {
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
    },
    [getPathWithoutLocale, router],
  );

  useEffect(() => {
    (async () => {
      if (!TokenService.getAccessToken()) {
        const { newAccessToken } = await TokenService.refreshToken(checkAccess);
        checkAccess(newAccessToken);
        setAccessToken(newAccessToken);
      }
    })();

    if (currentUser && accessToken) {
      authStore.login(currentUser ?? null);
    }
  }, [router, pathname, currentUser, checkAccess, isInitialized, accessToken]);

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
