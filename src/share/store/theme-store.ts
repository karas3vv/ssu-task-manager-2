"use client";

import { makeAutoObservable } from "mobx";

export class ThemeStore {
  theme: "light" | "dark" = "light";

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(theme: "light" | "dark"): void {
    this.theme = theme;
    document.documentElement.dataset.theme = theme;
  }

  detectTheme(): void {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.setTheme(prefersDark ? "dark" : "light");
  }
}
