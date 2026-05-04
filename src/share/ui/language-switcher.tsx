"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, Locale, localeLabels } from "@share/config/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

export function LanguageSwitcher({ locale, className = "button" }: LanguageSwitcherProps): JSX.Element {
  const pathname = usePathname() ?? `/${locale}`;
  const targetLocale: Locale = locale === "ru" ? "en" : "ru";
  const segments = pathname.split("/");

  if (isLocale(segments[1] ?? "")) {
    segments[1] = targetLocale;
  } else {
    segments.splice(1, 0, targetLocale);
  }

  const href = segments.join("/") || `/${targetLocale}`;

  return (
    <Link className={className} href={href} hrefLang={targetLocale} title="Сменить язык">
      {localeLabels[targetLocale]}
    </Link>
  );
}
