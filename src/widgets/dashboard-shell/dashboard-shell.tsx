"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Locale } from "@share/config/i18n";
import { useRootStore } from "@share/providers/store-provider";
import { messages } from "@share/i18n/messages";
import { LanguageSwitcher } from "@share/ui/language-switcher";

type DashboardShellProps = {
  children: ReactNode;
  locale: Locale;
};

export function DashboardShell({ children, locale }: DashboardShellProps): JSX.Element {
  const router = useRouter();
  const { authStore, themeStore } = useRootStore();
  const t = messages[locale];
  const items = [
    { href: `/${locale}/dashboard`, label: t.common.profile },
    { href: `/${locale}/dashboard/tasks`, label: t.common.tasks },
    { href: `/${locale}/dashboard/projects`, label: t.common.projects },
    { href: `/${locale}/dashboard/calendar`, label: t.common.calendar },
    { href: `/${locale}/dashboard/analytics`, label: t.common.analytics },
    { href: `/${locale}/dashboard/team`, label: t.common.team },
    { href: `/${locale}/dashboard/settings`, label: t.common.settings }
  ];

  async function handleLogout(): Promise<void> {
    await authStore.logout();
    router.push(`/${locale}/auth/login`);
    router.refresh();
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <Link className="brand" href={`/${locale}/dashboard`}>
          {t.common.appName}
        </Link>
        <nav aria-label={t.common.dashboard}>
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="toolbar" style={{ marginTop: 24 }}>
          <LanguageSwitcher locale={locale} />
          <button
            className="button"
            type="button"
            title={t.settingsBoard.themeTitle}
            onClick={() => themeStore.setTheme(themeStore.theme === "dark" ? "light" : "dark")}
          >
            ◐
          </button>
          <button className="button danger" type="button" onClick={handleLogout}>
            {t.common.logout}
          </button>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
