import Link from "next/link";
import { Locale } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";
import { LanguageSwitcher } from "@share/ui/language-switcher";

type LandingPageProps = {
  locale: Locale;
};

export function LandingPage({ locale }: LandingPageProps): JSX.Element {
  const t = messages[locale];

  return (
    <main className="hero">
      <div className="container">
        <div className="topbar" style={{ justifyContent: "flex-end" }}>
          <LanguageSwitcher locale={locale} />
        </div>
        <section className="hero-grid">
          <div>
            <h1>{t.landing.title}</h1>
            <p>{t.landing.subtitle}</p>
            <div className="toolbar">
              <Link className="button primary" href={`/${locale}/auth/register`}>
                {t.landing.cta}
              </Link>
              <Link className="button" href={`/${locale}/auth/login`}>
                {t.landing.secondary}
              </Link>
            </div>
          </div>
          <div className="panel hero-preview" aria-label={t.landing.previewLabel}>
            {Object.values(t.landing.preview).map((item) => (
              <article className="preview-column" key={item.title}>
                <span className="badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p className="muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
