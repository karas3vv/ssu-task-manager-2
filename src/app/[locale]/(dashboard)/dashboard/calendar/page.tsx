import { tasks } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { CalendarPlanner } from "@feature/calendar/calendar-planner";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type CalendarPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CalendarPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.calendarTitle, t.calendarDescription);
}

export default async function CalendarPage({ params }: CalendarPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];

  return (
    <>
      <section className="page-title">
        <div>
          <h1>{t.metadata.calendarTitle}</h1>
          <p className="muted">{t.calendarBoard.pageDescription}</p>
        </div>
      </section>
      <CalendarPlanner initialTasks={tasks} locale={locale} />
    </>
  );
}
