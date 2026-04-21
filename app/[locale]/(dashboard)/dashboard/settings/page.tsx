import { createMetadata } from "@shared/seo/metadata";
import { ThemeSettings } from "@features/theme/theme-settings";

type SettingsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SettingsPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Настройки", "Настройки темы и рабочего пространства.");
}

export default function SettingsPage(): JSX.Element {
  return (
    <>
      <section className="page-title">
        <h1>Настройки</h1>
      </section>
      <ThemeSettings />
    </>
  );
}
