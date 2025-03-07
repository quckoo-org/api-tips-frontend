import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { rootLogger } from "@/shared/logger/logger";
import { i18n } from "./config/i18n/i18n-config";
const decodeJwt = <T = never>(token: string): T | null => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};

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

export function checkAuth(
  request: NextRequest,
  locale: string | undefined,
): NextResponse | undefined {
  const authToken = request.cookies.get("jwt")?.value;

  const { pathname } = request.nextUrl;
  const paths = [`/${locale}/login`, `/${locale}/register`];

  if (!authToken) {
    return;
  }

  try {
    const decodedToken = decodeJwt(authToken) as { roles?: string[] };

    if (!decodedToken || !decodedToken?.roles) {
      console.error("Некорректный токен или отсутствуют роли");
      return;
    }

    const userRoles = decodedToken?.roles;

    if (userRoles?.includes("Admin") && paths?.includes(pathname)) {
      return NextResponse.redirect(new URL(`/${locale}/tariffs`, request.url));
    }

    if (userRoles?.includes("WebUser") && paths?.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url),
      );
    }
  } catch (error) {
    rootLogger.error("Ошибка при обработке токена: ", error);
    return;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search; // Сохраняем query-параметры
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
      new URL(`/${locale}${pathname}${searchParams}`, request.url),
    );
  }

  return checkAuth(request, locale);
  // Редирект для авторизованных пользователей
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
