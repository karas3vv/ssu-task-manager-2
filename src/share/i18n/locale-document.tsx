"use client";

import { useEffect } from "react";
import { Locale } from "@share/config/i18n";

type LocaleDocumentProps = {
  locale: Locale;
};

export function LocaleDocument({ locale }: LocaleDocumentProps): null {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
