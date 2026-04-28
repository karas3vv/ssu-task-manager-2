import { ReactNode } from "react";
import { resolveLocale } from "@shared/config/i18n";
import { DashboardShell } from "@widgets/dashboard-shell/dashboard-shell";

type DashboardLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DashboardLayout({ children, params }: DashboardLayoutProps): Promise<JSX.Element> {
  const { locale } = await params;
  return <DashboardShell locale={resolveLocale(locale)}>{children}</DashboardShell>;
}
