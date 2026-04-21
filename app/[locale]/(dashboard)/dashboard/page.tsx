import { cookies } from "next/headers";
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

export default async function DashboardPage({ params }: DashboardPageProps): Promise<JSX.Element> {
  await params;
  const cookieStore = await cookies();
  const session = cookieStore.get("task-manager-session")?.value ?? "no-session";

  return (
    <>
      <section className="page-title">
        <div>
          <h1>Личный кабинет</h1>
          <p className="muted">SSR-страница профиля с клиентским редактированием через MobX и axios. Сессия: {session}</p>
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
