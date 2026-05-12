"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, isLocale } from "@share/config/i18n";
import { useRootStore } from "@share/providers/store-provider";

type AuthWrapperProps = {
  children: ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps): JSX.Element {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { authStore } = useRootStore();
  const segments = pathname.split("/");
  const locale = isLocale(segments[1] ?? "") ? segments[1] : defaultLocale;
  const isDashboardRoute = pathname.startsWith(`/${locale}/dashboard`);

  useEffect(() => {
    if (!isDashboardRoute || authStore.user !== null || authStore.status === "loading") {
      return;
    }

    void authStore.loadProfile();
  }, [authStore, isDashboardRoute]);

  useEffect(() => {
    if (!isDashboardRoute || authStore.status !== "error") {
      return;
    }

    router.replace(`/${locale}/auth/login?next=${encodeURIComponent(pathname)}`);
  }, [authStore.status, isDashboardRoute, locale, pathname, router]);

  return <>{children}</>;
}
