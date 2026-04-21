"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { Project } from "@entities/project/model";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "@entities/task/model";
import { AuthResult, CreateTeamMemberPayload, LoginPayload, RegisterPayload, UpdateProfilePayload, UpdateTeamMemberPayload, UserProfile } from "@entities/user/model";
import { DashboardStats, taskManagerApi } from "@shared/api/task-manager-api";
import { RequestStatus } from "@shared/types/api";

export class AuthStore {
  user: UserProfile | null = null;
  status: RequestStatus = "idle";
  error: string | null = null;
  saveStatus: RequestStatus = "idle";
  saveMessage: string | null = null;

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  setAuthResult(result: AuthResult): void {
    this.user = result.user;
  }

  hydrateProfile(profile: UserProfile): void {
    if (this.user !== null) {
      return;
    }

    this.user = profile;
  }

  async updateProfile(payload: UpdateProfilePayload): Promise<void> {
    this.saveStatus = "loading";
    this.saveMessage = null;
    this.error = null;

    try {
      const profile = await taskManagerApi.updateProfile(payload);
      runInAction(() => {
        this.user = profile;
        this.rootStore.teamStore.updateMember(profile);
        this.saveStatus = "success";
        this.saveMessage = "Профиль обновлен";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Profile update failed";
        this.saveStatus = "error";
      });
    }
  }

  async login(payload: LoginPayload): Promise<void> {
    this.status = "loading";
    this.error = null;
    try {
      const result = await taskManagerApi.login(payload);
      runInAction(() => {
        this.user = result.user;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Login failed";
        this.status = "error";
      });
    }
  }

  async register(payload: RegisterPayload): Promise<void> {
    this.status = "loading";
    this.error = null;
    try {
      const result = await taskManagerApi.register(payload);
      runInAction(() => {
        this.user = result.user;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Registration failed";
        this.status = "error";
      });
    }
  }

  async logout(): Promise<void> {
    await taskManagerApi.logout();
    runInAction(() => {
      this.user = null;
      this.rootStore.taskStore.tasks = [];
    });
  }
}

export class TaskStore {
  tasks: Task[] = [];
  status: RequestStatus = "idle";
  error: string | null = null;
  createStatus: RequestStatus = "idle";
  createMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get doneCount(): number {
    return this.tasks.filter((task) => task.status === "done").length;
  }

  hydrate(tasks: Task[]): void {
    if (this.tasks.length > 0) {
      return;
    }

    this.tasks = tasks;
    this.status = "success";
  }

  async loadTasks(): Promise<void> {
    if (this.status === "loading" || this.tasks.length > 0) {
      return;
    }

    this.status = "loading";
    try {
      const tasks = await taskManagerApi.getTasks();
      runInAction(() => {
        this.tasks = tasks;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Tasks loading failed";
        this.status = "error";
      });
    }
  }

  async toggleTask(task: Task): Promise<void> {
    const status = task.status === "done" ? "inProgress" : "done";
    await this.updateTask(task.id, { status });
  }

  async createTask(payload: CreateTaskPayload): Promise<void> {
    this.createStatus = "loading";
    this.createMessage = null;
    this.error = null;

    try {
      const task = await taskManagerApi.createTask(payload);
      runInAction(() => {
        this.tasks = [task, ...this.tasks];
        this.createStatus = "success";
        this.createMessage = "Задача добавлена";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Task creation failed";
        this.createStatus = "error";
      });
    }
  }

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<void> {
    this.error = null;

    try {
      const updated = await taskManagerApi.updateTask(taskId, payload);
      runInAction(() => {
        this.tasks = this.tasks.map((item) => (item.id === updated.id ? updated : item));
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Task update failed";
      });
    }
  }
}

export class ProjectStore {
  projects: Project[] = [];
  status: RequestStatus = "idle";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(projects: Project[]): void {
    if (this.projects.length > 0) {
      return;
    }

    this.projects = projects;
    this.status = "success";
  }

  async loadProjects(): Promise<void> {
    if (this.status === "loading" || this.projects.length > 0) {
      return;
    }

    this.status = "loading";
    try {
      const projects = await taskManagerApi.getProjects();
      runInAction(() => {
        this.projects = projects;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Projects loading failed";
        this.status = "error";
      });
    }
  }
}

export class DashboardStore {
  stats: DashboardStats | null = null;
  status: RequestStatus = "idle";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadStats(): Promise<void> {
    if (this.status === "loading" || this.stats !== null) {
      return;
    }

    this.status = "loading";
    try {
      const stats = await taskManagerApi.getStats();
      runInAction(() => {
        this.stats = stats;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Stats loading failed";
        this.status = "error";
      });
    }
  }
}

export class TeamStore {
  members: UserProfile[] = [];
  status: RequestStatus = "idle";
  error: string | null = null;
  saveStatus: RequestStatus = "idle";
  saveMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(members: UserProfile[]): void {
    if (this.members.length > 0) {
      return;
    }

    this.members = members;
    this.status = "success";
  }

  updateMember(profile: UserProfile): void {
    this.members = this.members.map((member) => (member.id === profile.id ? profile : member));
  }

  async createMember(payload: CreateTeamMemberPayload): Promise<void> {
    this.saveStatus = "loading";
    this.saveMessage = null;
    this.error = null;

    try {
      const member = await taskManagerApi.createTeamMember(payload);
      runInAction(() => {
        this.members = [...this.members, member];
        this.saveStatus = "success";
        this.saveMessage = "Участник добавлен";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Team member creation failed";
        this.saveStatus = "error";
      });
    }
  }

  async editMember(memberId: string, payload: UpdateTeamMemberPayload): Promise<void> {
    this.saveStatus = "loading";
    this.saveMessage = null;
    this.error = null;

    try {
      const member = await taskManagerApi.updateTeamMember(memberId, payload);
      runInAction(() => {
        this.members = this.members.map((item) => (item.id === member.id ? member : item));
        this.saveStatus = "success";
        this.saveMessage = "Участник обновлен";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Team member update failed";
        this.saveStatus = "error";
      });
    }
  }

  async deleteMember(memberId: string): Promise<void> {
    this.saveStatus = "loading";
    this.saveMessage = null;
    this.error = null;

    try {
      const deletedMemberId = await taskManagerApi.deleteTeamMember(memberId);
      runInAction(() => {
        this.members = this.members.filter((member) => member.id !== deletedMemberId);
        this.saveStatus = "success";
        this.saveMessage = "Участник удален";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Team member delete failed";
        this.saveStatus = "error";
      });
    }
  }

  async loadTeam(): Promise<void> {
    if (this.status === "loading") {
      return;
    }

    this.status = "loading";
    try {
      const members = await taskManagerApi.getTeam();
      runInAction(() => {
        this.members = members;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Team loading failed";
        this.status = "error";
      });
    }
  }
}

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

export class RootStore {
  authStore: AuthStore;
  taskStore: TaskStore;
  projectStore: ProjectStore;
  dashboardStore: DashboardStore;
  teamStore: TeamStore;
  themeStore: ThemeStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.taskStore = new TaskStore();
    this.projectStore = new ProjectStore();
    this.dashboardStore = new DashboardStore();
    this.teamStore = new TeamStore();
    this.themeStore = new ThemeStore();
  }
}
