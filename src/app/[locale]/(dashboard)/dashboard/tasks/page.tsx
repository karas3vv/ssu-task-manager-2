import { tasks } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { TaskBoard } from "@widgets/task-board/task-board";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type TasksPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TasksPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.tasksTitle, t.tasksDescription);
}

export default async function TasksPage({ params }: TasksPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];

  return (
    <>
      <section className="page-title">
        <div>
          <h1>{t.metadata.tasksTitle}</h1>
        </div>
      </section>
      <TaskBoard initialTasks={tasks} locale={locale} />
    </>
  );
}
