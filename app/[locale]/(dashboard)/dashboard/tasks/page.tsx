import { tasks } from "@shared/api/mock-db";
import { createMetadata } from "@shared/seo/metadata";
import { TaskBoard } from "@widgets/task-board/task-board";

type TasksPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TasksPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Задачи", "CSR-доска задач с обновлением статусов.");
}

export default function TasksPage(): JSX.Element {
  return (
    <>
      <section className="page-title">
        <div>
          <h1>Задачи</h1>
          <p className="muted">CSR-компонент сразу получает SSR-данные, а axios остается fallback-слоем MobX.</p>
        </div>
      </section>
      <TaskBoard initialTasks={tasks} />
    </>
  );
}
