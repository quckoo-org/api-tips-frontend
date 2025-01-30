import Image from "next/image";
import Link from "next/link";
import React from "react";
import { i18n, type Locale } from "@/config/i18n/i18n-config";
import { getDictionary } from "@/shared/locale/getDictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

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
          {dictionary.by_continuing_you_acknowledge_that_you_understand}
          <Link href="" className="text-blue-500 hover:underline">
            {dictionary.terms_and_conditions}
          </Link>{" "}
          and{" "}
          <Link href="" className="text-blue-500 hover:underline">
            {dictionary.privacy_policy}
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
