import { users } from "@share/api/mock-db";
import { createMetadata } from "@share/seo/metadata";
import { TeamList } from "@feature/team/team-list";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type TeamPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.teamTitle, t.teamDescription);
}

export default async function TeamPage({ params }: TeamPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];

  return (
    <>
      <section className="page-title">
        <div>
          <h1>{t.metadata.teamTitle}</h1>
          <p className="muted">{t.teamBoard.description}</p>
        </div>
      </section>
      <TeamList initialMembers={users} locale={locale} />
    </>
  );
}
