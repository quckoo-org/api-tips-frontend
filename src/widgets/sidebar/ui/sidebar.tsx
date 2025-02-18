import { Box, Button, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconUsers } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import {
  CircleDollarSignIcon,
  CircleUserRoundIcon,
  LogOut,
  PackageIcon,
  ReceiptText,
  Settings,
  SquareKanbanIcon,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { QUERY_KEYS } from "@/shared/lib";
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

  return (
    <aside
      className={clsx(
        "flex flex-col bg-gray-50 px-4 py-6 transition-all duration-200",
        className,
        {
          ["w-[75px]"]: !opened, // Закрытое состояние
          ["w-[250px]"]: opened, // Открытое состояние
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
        {/*{opened && (*/}
        {/*  <ActionIcon onClick={handlers.close}>*/}
        {/*    <PanelLeftCloseIcon />*/}
        {/*  </ActionIcon>*/}
        {/*)}*/}
      </div>
      <Link href={ROUTES.HOME} className="text-xl font-bold">
        <div
          className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
            ["bg-indigo-100 text-primary-600"]: isActiveRoute(
              pathname,
              ROUTES.HOME,
            ),
          })}
        >
          <IconHome className="shrink-0" />
          {opened && <Text className="font-medium">{t("home")}</Text>}
        </div>
      </Link>
      {authStore.isAuthenticated && (
        <Link href={ROUTES.ADMINISTRATION} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                ROUTES.ADMINISTRATION,
              ),
            })}
          >
            <SquareKanbanIcon className="shrink-0" />
            {opened && (
              <Text className="font-medium">{t("administration")}</Text>
            )}
          </div>
        </Link>
      )}
      {authStore.isAuthenticated && (
        <Link href={ROUTES.USER_REGISTRY} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                ROUTES.USER_REGISTRY,
              ),
            })}
          >
            <IconUsers className="shrink-0" />
            {opened && (
              <Text className="font-medium text-nowrap">
                {t("user_registry")}
              </Text>
            )}
          </div>
        </Link>
      )}
      {authStore.isAuthenticated && (
        <Link href={ROUTES.TARIFFS} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                ROUTES.TARIFFS,
              ),
            })}
          >
            <CircleDollarSignIcon className="shrink-0" />
            {opened && <Text className="font-medium">{t("tariffs")}</Text>}
          </div>
        </Link>
      )}
      {authStore.isAuthenticated && (
        <Link href={ROUTES.ORDERS} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                ROUTES.ORDERS,
              ),
            })}
          >
            <PackageIcon className="shrink-0" />
            {opened && <Text className="font-medium">{t("orders")}</Text>}
          </div>
        </Link>
      )}
      {authStore.isAuthenticated && (
        <Link href={ROUTES.INVOICES} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                ROUTES.INVOICES,
              ),
            })}
          >
            <ReceiptText className="shrink-0" />
            {opened && <Text className="font-medium">{t("invoices")}</Text>}
          </div>
        </Link>
      )}
      {authStore.isAuthenticated && (
        <Link href={ROUTES.REQUISITES} className="text-xl font-bold">
          <div
            className={clsx("flex gap-x-2 p-2.5 rounded-sm ", {
              ["bg-indigo-100 text-primary-600"]: isActiveRoute(
                pathname,
                ROUTES.REQUISITES,
              ),
            })}
          >
            <ReceiptText className="shrink-0" />
            {opened && <Text className="font-medium">{t("requisites")}</Text>}
          </div>
        </Link>
      )}
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
