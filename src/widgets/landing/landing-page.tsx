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
          <div className="panel hero-preview" aria-label="Превью рабочего процесса">
            <article className="preview-column">
              <span className="badge">План</span>
              <h3>Соберите задачи</h3>
              <p className="muted">Опишите работу, назначьте дедлайн и приоритет.</p>
            </article>
            <article className="preview-column">
              <span className="badge">Фокус</span>
              <h3>Видите неделю</h3>
              <p className="muted">Календарь показывает, что важно сегодня и что приближается.</p>
            </article>
            <article className="preview-column">
              <span className="badge">Команда</span>
              <h3>Двигайтесь вместе</h3>
              <p className="muted">Профили, проекты и задачи остаются в одном рабочем пространстве.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
