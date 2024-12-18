"use client";

import { Menu, Button, Container } from "@mantine/core";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TokenService } from "@/shared/lib/tokenService";
import { ROUTES } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";
import { fetchClient } from "@/shared/utils/fetchClient";

const Header = observer(() => {
  const pathname = usePathname();
  const endOfPathName = pathname.split("/")[2];
  const router = useRouter();

  const isAuthPage = endOfPathName === "login" || pathname === "register";
  const logout = async () => {
    await fetchClient.post("/auth/logout");
    authStore.logout();
    router.push(ROUTES.HOME);
  };
  console.log(TokenService.getAccessToken());
  return (
    <header className="bg-gray-800 text-white">
      <Container className="p-4 flex justify-between items-center" size="xl">
        <div className="flex gap-x-4">
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>
          <Link href={ROUTES.TARIFFS} className="text-xl font-bold">
            Tariffs
          </Link>
        </div>
        {TokenService.getAccessToken() ? (
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Button variant="subtle" className="text-white">
                {authStore?.user?.email}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={logout}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <div>
            {isAuthPage ? (
              endOfPathName === "login" ? (
                <Link href={ROUTES.REGISTER}>
                  <Button variant="outline">Register</Button>
                </Link>
              ) : (
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline">Login</Button>
                </Link>
              )
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button variant="filled">Login</Button>
              </Link>
            )}
          </div>
        )}
      </Container>
    </header>
  );
});

export default Header;
