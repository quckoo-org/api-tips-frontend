import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./config/i18n/i18n-config";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkAuth(
  request: NextRequest,
  locale?: string,
): NextResponse | undefined {
  const token = request.cookies.get("auth-token");

  if (!token) {
    const loginUrl = new URL(`${locale}/login`, request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return undefined;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  const locale = getLocale(request);
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  // if (pathname.startsWith("/login")) {
  //   return NextResponse.next();
  // }

  // // Проверка авторизации для всех остальных маршрутов
  // const authResponse = checkAuth(request);
  // if (authResponse) return authResponse;

  // // Пропускаем запрос дальше
  // return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)", // Исключаем любые запросы к файлам с расширениями
  ],
};
