import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { Locale, locales, resolveLocale } from "@shared/config/i18n";
import { RootWrapper } from "@shared/providers/root-wrapper";
import { SchemaOrg } from "@shared/seo/schema-org";
import { createMetadata } from "@shared/seo/metadata";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  return createMetadata(resolveLocale(locale));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <style>{`
          :root {
            color-scheme: light;
            --bg: #f7f2e8;
            --surface: #fffaf1;
            --surface-strong: #ffffff;
            --text: #17231f;
            --muted: #66736d;
            --primary: #206a5d;
            --primary-strong: #13453e;
            --accent: #b85c38;
            --line: #ded5c5;
            --danger: #a63a3a;
            --shadow: 0 18px 50px rgba(35, 45, 42, 0.12);
          }
          [data-theme="dark"] {
            color-scheme: dark;
            --bg: #141917;
            --surface: #1e2522;
            --surface-strong: #252d29;
            --text: #f4efe5;
            --muted: #acb8b2;
            --primary: #7ac7ae;
            --primary-strong: #9edbc9;
            --accent: #e09569;
            --line: #39433f;
            --danger: #ef8f8f;
            --shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
          }
          * { box-sizing: border-box; }
          html, body { margin: 0; min-height: 100%; background: var(--bg); color: var(--text); font-family: Arial, Helvetica, sans-serif; letter-spacing: 0; }
          a { color: inherit; text-decoration: none; }
          button, input, select, textarea { font: inherit; }
          button { cursor: pointer; }
          .page { min-height: 100vh; }
          .container { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
          .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 72px; }
          .brand { font-size: 24px; font-weight: 800; color: var(--primary-strong); }
          .nav { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
          .button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 42px; max-width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 10px 16px; background: var(--surface-strong); color: var(--text); font-weight: 700; line-height: 1.2; text-align: center; white-space: normal; }
          .button.primary { background: var(--primary); border-color: var(--primary); color: #fff; }
          .button.danger { color: var(--danger); }
          .hero { min-height: calc(100vh - 32px); display: grid; align-items: center; padding: 20px 0 56px; background: linear-gradient(135deg, rgba(32,106,93,.18), transparent 42%), linear-gradient(315deg, rgba(184,92,56,.16), transparent 40%); }
          .hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 44px; align-items: center; }
          .hero h1 { font-size: clamp(48px, 8vw, 92px); line-height: .92; margin: 0 0 22px; letter-spacing: 0; }
          .hero p { font-size: 21px; line-height: 1.55; color: var(--muted); margin: 0 0 28px; max-width: 650px; }
          .panel { min-width: 0; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; box-shadow: var(--shadow); padding: 24px; }
          .hero-preview { display: grid; gap: 14px; }
          .preview-column { background: var(--surface-strong); border: 1px solid var(--line); border-radius: 8px; padding: 18px; }
          .preview-column h3 { margin: 14px 0 8px; }
          .preview-column p { font-size: 16px; margin: 0; }
          .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .stat { background: var(--surface-strong); border: 1px solid var(--line); border-radius: 8px; padding: 18px; }
          .stat strong { display: block; font-size: 32px; margin-bottom: 6px; }
          .auth-screen { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
          .form { width: min(430px, 100%); display: grid; gap: 14px; }
          .form h1 { margin: 0 0 10px; }
          .field { display: grid; gap: 6px; color: var(--muted); font-weight: 700; }
          .input { width: 100%; min-width: 0; min-height: 44px; border: 1px solid var(--line); border-radius: 8px; padding: 0 12px; background: var(--surface-strong); color: var(--text); }
          .textarea { min-height: 92px; padding-top: 10px; resize: vertical; }
          .dashboard-layout { min-height: 100vh; display: grid; grid-template-columns: 260px 1fr; }
          .sidebar { background: var(--surface); border-right: 1px solid var(--line); padding: 24px; position: sticky; top: 0; height: 100vh; }
          .sidebar nav { display: grid; gap: 8px; margin-top: 24px; }
          .sidebar a { padding: 12px 14px; border-radius: 8px; color: var(--muted); font-weight: 700; }
          .sidebar a:hover { background: var(--surface-strong); color: var(--text); }
          .content { padding: 28px; }
          .page-title { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
          .page-title h1 { margin: 0; font-size: 34px; }
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(190px, 100%), 1fr)); gap: 16px; }
          .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 16px; }
          .grid > *, .cards > *, .form-row > * { min-width: 0; }
          .card { min-width: 0; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 18px; overflow: hidden; }
          .card h2, .card h3 { margin-top: 0; overflow-wrap: anywhere; }
          .card p { overflow-wrap: anywhere; }
          .muted { color: var(--muted); }
          .badge { display: inline-flex; align-items: center; max-width: 100%; min-height: 28px; padding: 4px 10px; border-radius: 999px; background: rgba(32,106,93,.13); color: var(--primary-strong); font-weight: 800; line-height: 1.2; overflow-wrap: anywhere; }
          .toolbar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
          .task-workspace { display: grid; gap: 18px; }
          .task-form { width: 100%; }
          .team-workspace { display: grid; gap: 18px; }
          .team-form { width: 100%; }
          .edit-task-form { display: grid; gap: 12px; }
          .card-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-top: 12px; }
          .form-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
          .profile-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr); gap: 18px; align-items: start; }
          .profile-form { width: 100%; }
          .profile-preview { position: sticky; top: 28px; }
          .fieldset { border: 1px solid var(--line); border-radius: 8px; padding: 14px; display: grid; gap: 10px; }
          .fieldset legend { padding: 0 6px; color: var(--muted); font-weight: 800; }
          .swatches { display: flex; gap: 10px; flex-wrap: wrap; }
          .swatch { width: 38px; height: 38px; border-radius: 999px; border: 3px solid transparent; box-shadow: inset 0 0 0 1px rgba(255,255,255,.35); }
          .swatch.active { border-color: var(--text); }
          .check { display: flex; align-items: center; gap: 10px; color: var(--text); font-weight: 700; }
          .check input { width: 18px; height: 18px; accent-color: var(--primary); }
          .avatar { width: 76px; height: 76px; border-radius: 999px; display: grid; place-items: center; color: #fff; font-size: 34px; font-weight: 800; margin-bottom: 14px; }
          .profile-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 18px; }
          .success-text { color: var(--primary-strong); font-weight: 800; margin: 0; }
          .calendar-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 18px; align-items: start; }
          .calendar-board { display: grid; grid-template-columns: repeat(7, minmax(132px, 1fr)); gap: 12px; overflow-x: auto; padding-bottom: 6px; }
          .calendar-day { min-width: 0; min-height: 178px; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 14px; display: grid; grid-template-rows: auto 1fr; gap: 12px; overflow: hidden; }
          .calendar-day.today { border-color: var(--primary); box-shadow: inset 0 0 0 1px var(--primary); }
          .calendar-day header { min-width: 0; display: grid; gap: 4px; }
          .calendar-day header > * { min-width: 0; overflow-wrap: anywhere; }
          .day-tasks { min-width: 0; display: grid; gap: 8px; align-content: start; }
          .calendar-task { min-width: 0; max-width: 100%; border-left: 4px solid var(--primary); background: var(--surface-strong); border-radius: 8px; padding: 10px; display: grid; gap: 4px; overflow: hidden; }
          .calendar-task span { min-width: 0; font-weight: 800; line-height: 1.25; overflow-wrap: anywhere; }
          .calendar-task small { min-width: 0; color: var(--muted); line-height: 1.25; overflow-wrap: anywhere; }
          .calendar-task.priority-high { border-left-color: var(--danger); }
          .calendar-task.priority-medium { border-left-color: var(--accent); }
          .calendar-task.priority-low { border-left-color: var(--primary); }
          .empty-day { align-self: center; margin: 0; }
          .calendar-summary { display: grid; gap: 14px; position: sticky; top: 28px; }
          .focus-card p:last-child { margin-bottom: 0; }
          .not-found { min-height: 100vh; display: grid; place-items: center; text-align: center; padding: 24px; }
          @media (max-width: 820px) {
            .hero-grid, .dashboard-layout, .grid, .cards, .profile-grid, .calendar-layout, .form-row { grid-template-columns: 1fr; }
            .calendar-board { grid-template-columns: repeat(2, minmax(160px, 1fr)); overflow-x: visible; }
            .sidebar { position: static; height: auto; border-right: 0; border-bottom: 1px solid var(--line); }
            .profile-preview, .calendar-summary { position: static; }
            .content { padding: 20px 16px; }
            .page-title { align-items: flex-start; flex-direction: column; }
          }
        `}</style>
        <NextIntlClientProvider messages={messages}>
          <RootWrapper>{children}</RootWrapper>
        </NextIntlClientProvider>
        <SchemaOrg locale={locale} />
      </body>
    </html>
  );
}
