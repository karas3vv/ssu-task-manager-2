"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { taskManagerApi } from "@share/api/task-manager-api";
import { AuthResult, LoginPayload, RegisterPayload, UpdateProfilePayload, UserProfile } from "@share/model/user";
import { RequestStatus } from "@share/types/api";
import type { RootStore } from "./root-store";

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
