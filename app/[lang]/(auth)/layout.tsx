import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

type AuthLayoutProps = PropsWithChildren;

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 ">
      <div className="max-w-md w-full h-full flex flex-col justify-between">
        <div className="mb-6 text-center">
          <Image
            src="/logo-inverse.svg"
            alt="Smarterer Logo"
            width={480}
            height={32}
            className="mx-auto h-12 mb-4"
          />
        </div>
        {children}
        <div className="mt-4 text-center text-xs text-gray-500">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Link href="" className="text-blue-500 hover:underline">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href="" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
