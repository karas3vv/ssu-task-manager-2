import { MetadataRoute } from "next";
import { locales } from "@shared/config/i18n";

const routes = ["", "/auth/login", "/auth/register", "/dashboard", "/dashboard/tasks", "/dashboard/projects", "/dashboard/calendar", "/dashboard/analytics", "/dashboard/team", "/dashboard/settings"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `http://localhost:3000/${locale}${route}`,
      lastModified: new Date("2026-04-21"),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    }))
  );
}
