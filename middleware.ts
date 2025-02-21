import { match as matchLocale } from "@formatjs/intl-localematcher";
import jwt from "jsonwebtoken"; // Используем для декодирования токена
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROLES } from "@/shared/lib";
import { ROUTES } from "@/shared/router";
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

export function checkAuth(
  request: NextRequest,
  locale: string | undefined,
): NextResponse | undefined {
  const authToken = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;
  const paths = [`/${locale}${ROUTES.LOGIN}`, `/${locale}${ROUTES.REGISTER}`];

  if (!authToken) {
    return;
  }

  try {
    const decodedToken = jwt.decode(authToken) as { roles?: string[] };

    if (!decodedToken || !decodedToken.roles) {
      console.error("Некорректный токен или отсутствуют роли");
      return;
    }

    const userRoles = decodedToken.roles;

    if (userRoles.includes(ROLES.ADMIN) && paths?.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/${locale}/${ROUTES.TARIFFS}`, request.url),
      );
    }

    if (userRoles.includes(ROLES.WebUser) && paths?.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/${locale}/${ROUTES.DASHBOARD}`, request.url),
      );
    }
  } catch (error) {
    console.error("Ошибка при обработке токена: ", error);
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
