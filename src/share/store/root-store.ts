"use client";

import { AuthStore } from "./auth-store";
import { ProjectStore } from "./project-store";
import { TaskStore } from "./task-store";
import { TeamStore } from "./team-store";
import { ThemeStore } from "./theme-store";

export class RootStore {
  authStore: AuthStore;
  taskStore: TaskStore;
  projectStore: ProjectStore;
  teamStore: TeamStore;
  themeStore: ThemeStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.taskStore = new TaskStore();
    this.projectStore = new ProjectStore();
    this.teamStore = new TeamStore();
    this.themeStore = new ThemeStore();
  }
}

export { AuthStore } from "./auth-store";
export { ProjectStore } from "./project-store";
export { TaskStore } from "./task-store";
export { TeamStore } from "./team-store";
export { ThemeStore } from "./theme-store";
