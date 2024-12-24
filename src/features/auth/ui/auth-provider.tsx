"use client";

import { Loader, Text } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES, routesConfig } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const currentUser = useGetCurrentUser(0);
  const [isInitialized, setInitialized] = useState(false);

  const checkAccess = useCallback(() => {
    const route = routesConfig.find((r) => r.path === pathname);

    if (!route) {
      return true;
    }

    if (route.requiresAuth && !currentUser.isSuccess) {
      router.push(ROUTES.LOGIN);
      return false;
    }

    if (route.isAdmin && (!currentUser.data || !currentUser.data.isAdmin)) {
      router.push(ROUTES.FORBIDDEN);
      return false;
    }

    return true;
  }, [currentUser.data, currentUser.isSuccess, pathname, router]);

  useEffect(() => {
    if (currentUser.isLoading) {
      return;
    }

    if (currentUser.isSuccess) {
      authStore.login(currentUser.data);
    }

    if (!isInitialized) {
      setInitialized(true);
    } else if (currentUser.isError) {
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
  ]);

  if (!isInitialized || currentUser.isLoading) {
    return (
      <div className="h-dvh flex items-center pt-8 flex-col">
        <Text>{t("please_wait_loading")}...</Text>
        <Loader width={60} height={60} />
      </div>
    );
  }

  return <div>{children}</div>;
};
