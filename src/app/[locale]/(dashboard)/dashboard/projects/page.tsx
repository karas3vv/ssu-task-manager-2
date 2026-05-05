import { projects } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { ProjectList } from "@feature/tasks/project-list";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.projectsTitle, t.projectsDescription);
}

export default async function ProjectsPage({ params }: ProjectsPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];

  return (
    <>
      <section className="page-title">
        <div>
          <h1>{t.metadata.projectsTitle}</h1>
        </div>
      </section>
      <ProjectList initialProjects={projects} locale={locale} />
    </>
  );
}
