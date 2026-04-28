import { createMetadata } from "@shared/seo/metadata";
import { demoUser, projects, tasks } from "@shared/api/mock-db";
import { ProfileEditor } from "@features/profile/profile-editor";

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DashboardPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Личный кабинет", "Профиль пользователя и краткая сводка TaskFlow.");
}

export default function DashboardPage(): JSX.Element {
  return (
    <>
      <section className="page-title">
        <div>
          <h1>Личный кабинет</h1>
        </div>
      </section>
      <ProfileEditor
        completedTasks={tasks.filter((task) => task.status === "done").length}
        initialProfile={demoUser}
        projectsTotal={projects.length}
        tasksTotal={tasks.length}
      />
    </>
  );
}
