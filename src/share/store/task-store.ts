"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { taskManagerApi } from "@share/api/task-manager-api";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "@share/model/task";
import { RequestStatus } from "@share/types/api";

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
