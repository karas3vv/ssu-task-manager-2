import { projects, tasks } from "@shared/api/mock-db";
import { createMetadata } from "@shared/seo/metadata";

type AnalyticsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AnalyticsPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Аналитика", "Метрики задач и проектов.");
}

export default function AnalyticsPage(): JSX.Element {
  const completed = tasks.filter((task) => task.status === "done").length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <>
      <section className="page-title">
        <h1>Аналитика</h1>
      </section>
      <div className="grid">
        <article className="card">
          <strong>{progress}%</strong>
          <p className="muted">Выполнение задач</p>
        </article>
        <article className="card">
          <strong>{tasks.filter((task) => task.priority === "high").length}</strong>
          <p className="muted">Высокий приоритет</p>
        </article>
        <article className="card">
          <strong>{projects.filter((project) => project.status === "active").length}</strong>
          <p className="muted">Активных проектов</p>
        </article>
        <article className="card">
          <strong>{tasks.filter((task) => task.status === "review").length}</strong>
          <p className="muted">На ревью</p>
        </article>
      </div>
    </>
  );
}
