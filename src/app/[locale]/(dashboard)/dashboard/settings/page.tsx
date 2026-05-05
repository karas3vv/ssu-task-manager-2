import { createMetadata } from "@share/seo/metadata";
import { ThemeSettings } from "@feature/theme/theme-settings";
import { messages } from "@share/i18n/messages";
import { resolveLocale } from "@share/config/i18n";

type SettingsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SettingsPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.settingsTitle, t.settingsDescription);
}

export default async function SettingsPage({ params }: SettingsPageProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const t = messages[locale];

  return (
    <>
      <section className="page-title">
        <h1>{t.metadata.settingsTitle}</h1>
      </section>
      <ThemeSettings locale={locale} />
    </>
  );
}
