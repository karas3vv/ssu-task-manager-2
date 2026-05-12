import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { Locale, locales, resolveLocale } from "@share/config/i18n";
import { LocaleDocument } from "@share/i18n/locale-document";
import { createMetadata } from "@share/seo/metadata";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  return createMetadata(resolveLocale(locale));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps): Promise<JSX.Element> {
  const { locale: localeValue } = await params;
  const locale = resolveLocale(localeValue);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleDocument locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
