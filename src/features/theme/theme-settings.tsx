"use client";

import { observer } from "mobx-react-lite";
import { useRootStore } from "@shared/providers/store-provider";

export const ThemeSettings = observer(function ThemeSettings(): JSX.Element {
  const { themeStore } = useRootStore();

  return (
    <article className="card">
      <h3>Тема интерфейса</h3>
      <p className="muted">Тема по умолчанию определяется настройкой браузера, затем ее можно переключить вручную.</p>
      <div className="toolbar">
        <button className="button primary" type="button" onClick={() => themeStore.setTheme("light")}>
          Светлая
        </button>
        <button className="button" type="button" onClick={() => themeStore.setTheme("dark")}>
          Темная
        </button>
      </div>
    </article>
  );
});
