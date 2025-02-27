"use client";

import { Box, Button, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconUsers } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import {
  CircleDollarSignIcon,
  CircleUserRoundIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  LogOut,
  PackageIcon,
  ReceiptText,
  Settings,
  SquareKanbanIcon,
  Landmark,
  FileBadge,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { getCurrentUser, QUERY_KEYS, ROLES, TokenService } from "@/shared/lib";
import { useTranslations } from "@/shared/locale/translations";
import { ROUTES } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";
import { fetchClient } from "@/shared/utils/fetchClient";

type SidebarProps = {
  className?: string;
};

export const Sidebar: FC<SidebarProps> = observer(({ className }) => {
  const pathname = usePathname();
  const { t } = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser(TokenService.getAccessToken());

  const [opened, handlers] = useDisclosure(true);

  const logout = async () => {
    await fetchClient.post("/api/auth/logout");
    authStore.logout();
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    router.push(ROUTES.HOME);
  };

  const isActiveRoute = (pathname: string, route: string) => {
    const parts = pathname.split("/").filter(Boolean); // Разбиваем URL и убираем пустые элементы
    const currentRoute = "/" + parts[1]; // Второй элемент — это ROUTE (после lang)

    return currentRoute === route;
  };

  const getRoutes = () => {
    const routes = {
      [ROLES.WebUser]: [
        { path: ROUTES.HOME, text: t("home"), icon: IconHome },
        {
          path: ROUTES.DASHBOARD,
          text: t("dashboard"),
          icon: LayoutDashboardIcon,
        },
        {
          path: ROUTES.MY_ORDERS,
          text: t("my_orders"),
          icon: FileBadge,
        },
      ],
      [ROLES.ADMIN]: [
        { path: ROUTES.HOME, text: t("home"), icon: IconHome },
        {
          path: ROUTES.ADMINISTRATION,
          text: t("administration"),
          icon: SquareKanbanIcon,
        },
        {
          path: ROUTES.USER_REGISTRY,
          text: t("user_registry"),
          icon: IconUsers,
        },
        {
          path: ROUTES.TARIFFS,
          text: t("tariffs"),
          icon: CircleDollarSignIcon,
        },
        {
          path: ROUTES.ORDERS,
          text: t("orders"),
          icon: PackageIcon,
        },
        {
          path: ROUTES.INVOICES,
          text: t("invoices"),
          icon: ReceiptText,
        },
        {
          path: ROUTES.REQUISITES,
          text: t("requisites"),
          icon: Landmark,
        },
        {
          path: ROUTES.HISTORIES,
          text: t("histories"),
          icon: HistoryIcon,
        },
        {
          path: ROUTES.MY_ORDERS,
          text: t("my_orders"),
          icon: FileBadge,
        },
      ],
    };

    if (currentUser?.roles.includes(ROLES.ADMIN)) {
      return routes[ROLES.ADMIN];
    }

    if (currentUser?.roles.includes(ROLES.WebUser)) {
      return routes[ROLES.WebUser];
    }

    return [{ path: ROUTES.HOME, text: t("home"), icon: IconHome }];
  };

  return (
    <aside
      className={clsx(
        "flex flex-col bg-gray-50 px-4 py-6 transition-all duration-200",
        className,
        {
          ["w-[75px]"]: !opened,
          ["w-[250px]"]: opened,
        },
      )}
    >
      <div className="flex justify-between items-center h-22 overflow-hidden">
        <div className="shrink-0 mb-6">
          {!opened ? (
            <Image
              onClick={handlers.open}
              src="/logo-icon.png"
              width={25}
              height={32}
              alt="logo-icon"
              className="transition-opacity duration-200"
            />
          ) : (
            <Image
              src="/logo-dark.svg"
              width={163}
              height={38}
              alt="logo"
              className="transition-opacity duration-200"
            />
          )}
        </div>
      </div>
      {getRoutes().map((route) => (
        <Link key={route.path} href={route.path} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                route.path,
              ),
            })}
          >
            <route.icon />
            {opened && <Text className="font-medium">{route.text}</Text>}
          </div>
        </Link>
      ))}
      <div className="mt-auto">
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Button
              leftSection={<CircleUserRoundIcon />}
              variant="transparent"
              className="text-gray-900"
            >
              <Box w={150}>
                <Text truncate="end" className="font-medium">
                  {authStore?.user?.email}
                </Text>
              </Box>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component="a"
              href={ROUTES.PROFILE}
              leftSection={<Settings size={12} />}
            >
              Profile
            </Menu.Item>
            <Menu.Item onClick={logout} leftSection={<LogOut size={12} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </aside>
  );
});
