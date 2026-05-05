import { createMetadata } from "@share/seo/metadata";
import { demoUser, projects, tasks } from "@share/api/mock-db";
import { ProfileEditor } from "@feature/profile/profile-editor";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DashboardPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.dashboardTitle, t.dashboardDescription);
}

export default async function DashboardPage({ params }: DashboardPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];

  return (
    <>
      <section className="page-title">
        <div>
          <h1>{t.metadata.dashboardTitle}</h1>
        </div>
      </section>
      <ProfileEditor
        completedTasks={tasks.filter((task) => task.status === "done").length}
        initialProfile={demoUser}
        locale={locale}
        projectsTotal={projects.length}
        tasksTotal={tasks.length}
      />
    </>
  );
}
