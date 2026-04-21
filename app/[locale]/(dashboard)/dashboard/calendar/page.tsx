import { tasks } from "@shared/api/mock-db";
import { createMetadata } from "@shared/seo/metadata";
import { CalendarPlanner } from "@features/calendar/calendar-planner";

type CalendarPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CalendarPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Календарь", "Календарь дедлайнов задач.");
}

export default function CalendarPage(): JSX.Element {
  return (
    <>
      <section className="page-title">
        <div>
          <h1>Календарь</h1>
          <p className="muted">План на ближайшие две недели: дедлайны, приоритеты и быстрый фокус на следующей задаче.</p>
        </div>
      </section>
      <CalendarPlanner initialTasks={tasks} />
    </>
  );
}
