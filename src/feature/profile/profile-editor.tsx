"use client";

import type * as React from "react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { UpdateProfilePayload, UserProfile, UserRole } from "@share/model/user";
import { getPositionLabelByLocale, getUserRoleLabels } from "@share/lib/display-labels";
import { Locale } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";
import { useRootStore } from "@share/providers/store-provider";

type ProfileEditorProps = {
  initialProfile: UserProfile;
  tasksTotal: number;
  projectsTotal: number;
  completedTasks: number;
  locale: Locale;
};

const avatarColors: string[] = ["#206a5d", "#b85c38", "#4d5f8f", "#7d4f8f", "#2f7d54"];

export const ProfileEditor = observer(function ProfileEditor({
  initialProfile,
  tasksTotal,
  projectsTotal,
  completedTasks,
  locale
}: ProfileEditorProps): JSX.Element {
  const { authStore } = useRootStore();
  const t = messages[locale];
  const userRoleLabels = getUserRoleLabels(locale);
  const roles: Array<{ value: UserRole; label: string }> = [
    { value: "owner", label: userRoleLabels.owner },
    { value: "manager", label: userRoleLabels.manager },
    { value: "member", label: userRoleLabels.member }
  ];
  const [form, setForm] = useState<UpdateProfilePayload>({
    name: initialProfile.name,
    email: initialProfile.email,
    role: initialProfile.role,
    avatarColor: initialProfile.avatarColor,
    position: initialProfile.position,
    workspaceName: initialProfile.workspaceName,
    notifications: initialProfile.notifications
  });
  const profile = authStore.user ?? initialProfile;

  useEffect(() => {
    authStore.hydrateProfile(initialProfile);
    void authStore.loadProfile();
  }, [authStore, initialProfile]);

  useEffect(() => {
    setForm({
      name: profile.name,
      email: profile.email,
      role: profile.role,
      avatarColor: profile.avatarColor,
      position: profile.position,
      workspaceName: profile.workspaceName,
      notifications: profile.notifications
    });
  }, [profile]);

  function updateField(field: keyof Omit<UpdateProfilePayload, "notifications">, value: string): void {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: field === "role" ? (value as UserRole) : value
    }));
  }

  function updateNotification(field: keyof UpdateProfilePayload["notifications"]): void {
    setForm((currentForm) => ({
      ...currentForm,
      notifications: {
        ...currentForm.notifications,
        [field]: !currentForm.notifications[field]
      }
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await authStore.updateProfile(form);
  }

  function handleInput(field: keyof Omit<UpdateProfilePayload, "notifications">) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => updateField(field, event.target.value);
  }

  return (
    <div className="profile-grid">
      <form className="panel form profile-form" onSubmit={handleSubmit}>
        <h2>{t.profile.editTitle}</h2>
        <label className="field">
          {t.common.name}
          <input className="input" value={form.name} onChange={handleInput("name")} required />
        </label>
        <label className="field">
          Email
          <input className="input" type="email" value={form.email} onChange={handleInput("email")} required />
        </label>
        <label className="field">
          {t.common.position}
          <input className="input" value={form.position} onChange={handleInput("position")} required />
        </label>
        <label className="field">
          {t.common.workspace}
          <input className="input" value={form.workspaceName} onChange={handleInput("workspaceName")} required />
        </label>
        <label className="field">
          {t.common.role}
          <select className="input" value={form.role} onChange={handleInput("role")}>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="fieldset">
          <legend>{t.profile.avatarColor}</legend>
          <div className="swatches">
            {avatarColors.map((color) => (
              <button
                aria-label={`${t.profile.chooseColor} ${color}`}
                className={color === form.avatarColor ? "swatch active" : "swatch"}
                key={color}
                onClick={() => updateField("avatarColor", color)}
                style={{ background: color }}
                title={`${t.profile.color} ${color}`}
                type="button"
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend>{t.profile.notifications}</legend>
          <label className="check">
            <input
              checked={form.notifications.deadlineReminders}
              onChange={() => updateNotification("deadlineReminders")}
              type="checkbox"
            />
            {t.profile.deadlineReminders}
          </label>
          <label className="check">
            <input checked={form.notifications.reviewUpdates} onChange={() => updateNotification("reviewUpdates")} type="checkbox" />
            {t.profile.reviewUpdates}
          </label>
          <label className="check">
            <input checked={form.notifications.dailyDigest} onChange={() => updateNotification("dailyDigest")} type="checkbox" />
            {t.profile.dailyDigest}
          </label>
        </fieldset>

        {authStore.error ? <p className="muted">{authStore.error}</p> : null}
        {authStore.saveMessage ? <p className="success-text">{authStore.saveMessage}</p> : null}
        <button className="button primary" disabled={authStore.saveStatus === "loading"} type="submit">
          {authStore.saveStatus === "loading" ? t.common.saving : t.profile.saveProfile}
        </button>
      </form>

      <aside className="panel profile-preview">
        <div className="avatar" style={{ background: profile.avatarColor }}>
          {profile.name.slice(0, 1)}
        </div>
        <h2>{profile.name}</h2>
        <p className="muted">{profile.email}</p>
        <span className="badge">{userRoleLabels[profile.role]}</span>
        <p>{getPositionLabelByLocale(profile.position, locale)}</p>
        <p className="muted">{profile.workspaceName}</p>
        <div className="stats profile-stats">
          <div className="stat">
            <strong>{tasksTotal}</strong>
            <span className="muted">{t.profile.statsTasks}</span>
          </div>
          <div className="stat">
            <strong>{projectsTotal}</strong>
            <span className="muted">{t.profile.statsProjects}</span>
          </div>
          <div className="stat">
            <strong>{completedTasks}</strong>
            <span className="muted">{t.profile.statsDone}</span>
          </div>
          <div className="stat">
            <strong>{profile.notifications.dailyDigest ? "On" : "Off"}</strong>
            <span className="muted">{t.profile.statsDigest}</span>
          </div>
        </div>
      </aside>
    </div>
  );
});
