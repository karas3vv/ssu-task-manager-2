import { users } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { TeamList } from "@feature/team/team-list";

type TeamPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Команда", "Участники команды TaskFlow.");
}

export default function TeamPage(): JSX.Element {
  return (
    <>
      <section className="page-title">
        <div>
          <h1>Команда</h1>
          <p className="muted">Список участников синхронизируется с обновленным профилем через store и API.</p>
        </div>
      </section>
      <TeamList initialMembers={users} />
    </>
  );
}
