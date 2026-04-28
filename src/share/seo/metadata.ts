import { Metadata } from "next";
import { resolveLocale } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";

export function createMetadata(localeValue: string, title?: string, description?: string): Metadata {
  const locale = resolveLocale(localeValue);
  const pageTitle = title ? `${title} | ${messages[locale].common.appName}` : messages[locale].metadata.title;
  const pageDescription = description ?? messages[locale].metadata.description;

  return {
    title: pageTitle,
    description: pageDescription,
    applicationName: messages[locale].common.appName,
    icons: {
      icon: "/icon",
      apple: "/apple-icon"
    }
  };
}
