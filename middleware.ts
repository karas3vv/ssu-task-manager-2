import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@shared/config/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always"
});

const protectedPrefix = /^\/(ru|en)\/dashboard/;

export default function middleware(request: NextRequest): NextResponse {
  const isProtectedRoute = protectedPrefix.test(request.nextUrl.pathname);
  const session = request.cookies.get("task-manager-session")?.value;

  if (isProtectedRoute && session !== "demo-session") {
    const locale = request.nextUrl.pathname.split("/")[1] ?? defaultLocale;
    const loginUrl = new URL(`/${locale}/auth/login`, request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*"]
};
