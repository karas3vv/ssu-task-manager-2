"use client";

import { useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLocale, Locale, localeLabels } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

export function LanguageSwitcher({ locale, className = "button" }: LanguageSwitcherProps): JSX.Element {
  const pathname = usePathname() ?? `/${locale}`;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const targetLocale: Locale = locale === "ru" ? "en" : "ru";
  const segments = pathname.split("/");

  if (isLocale(segments[1] ?? "")) {
    segments[1] = targetLocale;
  } else {
    segments.splice(1, 0, targetLocale);
  }

  const href = segments.join("/") || `/${targetLocale}`;

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  function handleSwitchLanguage(): void {
    startTransition(() => {
      router.replace(href);
    });
  }

  return (
    <button
      aria-busy={isPending}
      className={className}
      disabled={isPending}
      onClick={handleSwitchLanguage}
      onMouseEnter={() => router.prefetch(href)}
      title={messages[locale].language.switch}
      type="button"
    >
      {localeLabels[targetLocale]}
    </button>
  );
}
