'use client';

import { Menu, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
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
  console.log(authStore.user);
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">

      <div>
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
        {
          authStore.isAuthenticated &&
          <Link href={ROUTES.USER_REGISTRY} className="text-xl font-bold ml-8">
            Users
          </Link>
        }
      </div>
      { authStore.isAuthenticated? (
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
