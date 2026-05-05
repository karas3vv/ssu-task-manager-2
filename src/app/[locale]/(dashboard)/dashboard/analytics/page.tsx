import { projects, tasks } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type AnalyticsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AnalyticsPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.analyticsTitle, t.analyticsDescription);
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];
  const completed = tasks.filter((task) => task.status === "done").length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <>
      <section className="page-title">
        <h1>{t.metadata.analyticsTitle}</h1>
      </section>
      <div className="grid">
        <article className="card">
          <strong>{progress}%</strong>
          <p className="muted">{t.analyticsBoard.taskCompletion}</p>
        </article>
        <article className="card">
          <strong>{tasks.filter((task) => task.priority === "high").length}</strong>
          <p className="muted">{t.analyticsBoard.highPriority}</p>
        </article>
        <article className="card">
          <strong>{projects.filter((project) => project.status === "active").length}</strong>
          <p className="muted">{t.analyticsBoard.activeProjects}</p>
        </article>
        <article className="card">
          <strong>{tasks.filter((task) => task.status === "review").length}</strong>
          <p className="muted">{t.analyticsBoard.inReview}</p>
        </article>
      </div>
    </>
  );
}
