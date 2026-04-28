import { Metadata } from "next";
import { resolveLocale } from "@shared/config/i18n";
import { messages } from "@i18n/messages";

export function createMetadata(localeValue: string, title?: string, description?: string): Metadata {
  const locale = resolveLocale(localeValue);
  const pageTitle = title ? `${title} | ${messages[locale].common.appName}` : messages[locale].metadata.title;
  const pageDescription = description ?? messages[locale].metadata.description;
  const url = `http://localhost:3000/${locale}`;

  return {
    title: pageTitle,
    description: pageDescription,
    applicationName: messages[locale].common.appName,
    icons: {
      icon: "/icon",
      apple: "/apple-icon"
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: messages[locale].common.appName,
      locale,
      type: "website"
    }
  };
}
