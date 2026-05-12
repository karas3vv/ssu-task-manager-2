"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "@share/model/project";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "@share/model/task";
import { AuthResult, CreateTeamMemberPayload, LoginPayload, RegisterPayload, UpdateProfilePayload, UpdateTeamMemberPayload, UserProfile } from "@share/model/user";
import { taskManagerApi } from "@share/api/task-manager-api";
import { RequestStatus } from "@share/types/api";

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

  async loadProfile(): Promise<void> {
    this.status = "loading";
    this.error = null;

    try {
      const profile = await taskManagerApi.getProfile();
      runInAction(() => {
        this.user = profile;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Не удалось загрузить профиль";
        this.status = "error";
      });
    }
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
        this.error = error instanceof Error ? error.message : "Не удалось обновить профиль";
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
        this.error = error instanceof Error ? error.message : "Не удалось войти";
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
        this.error = error instanceof Error ? error.message : "Не удалось зарегистрироваться";
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
    if (this.status === "loading") {
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
        this.error = error instanceof Error ? error.message : "Не удалось загрузить задачи";
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
        this.error = error instanceof Error ? error.message : "Не удалось создать задачу";
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
        this.error = error instanceof Error ? error.message : "Не удалось обновить задачу";
      });
    }
  }
}

export class ProjectStore {
  projects: Project[] = [];
  status: RequestStatus = "idle";
  error: string | null = null;
  createStatus: RequestStatus = "idle";
  createMessage: string | null = null;

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
    if (this.status === "loading") {
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
        this.error = error instanceof Error ? error.message : "Не удалось загрузить проекты";
        this.status = "error";
      });
    }
  }

  async createProject(payload: CreateProjectPayload): Promise<void> {
    this.createStatus = "loading";
    this.createMessage = null;
    this.error = null;

    try {
      const project = await taskManagerApi.createProject(payload);
      runInAction(() => {
        this.projects = [project, ...this.projects];
        this.createStatus = "success";
        this.createMessage = "Проект добавлен";
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Не удалось создать проект";
        this.createStatus = "error";
      });
    }
  }

  async updateProject(projectId: string, payload: UpdateProjectPayload): Promise<void> {
    this.error = null;

    try {
      const updated = await taskManagerApi.updateProject(projectId, payload);
      runInAction(() => {
        this.projects = this.projects.map((item) => (item.id === updated.id ? updated : item));
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Не удалось обновить проект";
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
    const memberExists = this.members.some((member) => member.id === profile.id);

    if (!memberExists) {
      this.members = [profile, ...this.members];
      return;
    }

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
        this.error = error instanceof Error ? error.message : "Не удалось добавить участника";
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
        this.error = error instanceof Error ? error.message : "Не удалось обновить участника";
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
        this.error = error instanceof Error ? error.message : "Не удалось удалить участника";
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
        this.error = error instanceof Error ? error.message : "Не удалось загрузить команду";
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
