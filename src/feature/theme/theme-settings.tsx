"use client";

import { observer } from "mobx-react-lite";
import { Locale } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";
import { useRootStore } from "@share/providers/store-provider";

type ThemeSettingsProps = {
  locale: Locale;
};

export const ThemeSettings = observer(function ThemeSettings({ locale }: ThemeSettingsProps): JSX.Element {
  const { themeStore } = useRootStore();
  const t = messages[locale];

  return (
    <article className="card">
      <h3>{t.settingsBoard.themeTitle}</h3>
      <p className="muted">{t.settingsBoard.themeText}</p>
      <div className="toolbar">
        <button className="button primary" type="button" onClick={() => themeStore.setTheme("light")}>
          {t.settingsBoard.light}
        </button>
        <button className="button" type="button" onClick={() => themeStore.setTheme("dark")}>
          {t.settingsBoard.dark}
        </button>
      </div>
    </article>
  );
});
