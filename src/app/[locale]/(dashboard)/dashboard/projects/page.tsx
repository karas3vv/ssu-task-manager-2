import { projects } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { ProjectList } from "@feature/tasks/project-list";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Проекты", "Список проектов task-manager.");
}

export default function ProjectsPage(): JSX.Element {
  return (
    <>
      <section className="page-title">
        <div>
          <h1>Проекты</h1>
        </div>
      </section>
      <ProjectList initialProjects={projects} />
    </>
  );
}
