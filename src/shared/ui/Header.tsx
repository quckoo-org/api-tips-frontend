'use client';

import { Menu, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { TokenService } from "@/shared/lib/tokenService";
import { ROUTES } from "@/shared/router";
import { authStore } from "@/shared/stores/AuthStore";
import { fetchClient } from "@/shared/utils/fetchClient";

const Header = observer(() => {
  const pathname = usePathname();
  const endOfPathName = pathname.split('/')[2]
  const router = useRouter()

  const isAuthPage = endOfPathName === 'login' || pathname === 'register';
  const logout = async () => {
   await fetchClient.post('/auth/logout');
    authStore.logout();
    router.push(ROUTES.HOME)
  }
  console.log(TokenService.getAccessToken());
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>
      { TokenService.getAccessToken()? (
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
            endOfPathName === 'login' ? (
              <Link href={ROUTES.REGISTER}>
                <Button variant="outline">
                  Register
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button variant="outline" >
                  Login
                </Button>
              </Link>
            )
          ) : (
            <Link href={ROUTES.LOGIN}>
              <Button variant="filled" >
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
});

export default Header;
