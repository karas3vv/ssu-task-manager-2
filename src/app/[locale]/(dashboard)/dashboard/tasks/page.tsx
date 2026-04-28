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
        </div>
      </section>
      <TaskBoard initialTasks={tasks} />
    </>
  );
}
