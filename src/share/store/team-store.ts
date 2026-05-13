"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { taskManagerApi } from "@share/api/task-manager-api";
import { CreateTeamMemberPayload, UpdateTeamMemberPayload, UserProfile } from "@share/model/user";
import { RequestStatus } from "@share/types/api";

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
