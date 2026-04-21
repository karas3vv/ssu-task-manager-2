import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale } from "@shared/config/i18n";
import { messages } from "@i18n/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolvedLocale = locale && isLocale(locale) ? locale : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: messages[resolvedLocale]
  };
});
