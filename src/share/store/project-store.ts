"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { taskManagerApi } from "@share/api/task-manager-api";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "@share/model/project";
import { RequestStatus } from "@share/types/api";

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
