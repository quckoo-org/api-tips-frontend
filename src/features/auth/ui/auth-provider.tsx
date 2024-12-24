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

  console.log({ accessToken, pathname });

  const checkAccess = useCallback(() => {
    const route = routesConfig.find((r) => r.path === pathname);

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
  }, [currentUser.data, currentUser.isSuccess, pathname, router]);

  useEffect(() => {
    if (!accessToken) {
      router.push(ROUTES.LOGIN);
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
    } else {
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
  ]);

  if (
    (!isInitialized && !!accessToken) ||
    (currentUser.isLoading && !!accessToken)
  ) {
    return (
      <div className="h-dvh flex items-center pt-8 flex-col">
        <Text>{t("please_wait_loading")}...</Text>
        <Loader width={60} height={60} />
      </div>
    );
  }

  return <div>{children}</div>;
};
