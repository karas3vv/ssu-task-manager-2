"use client";

import type * as React from "react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CreateTeamMemberPayload, UserProfile, UserRole } from "@entities/user/model";
import { useRootStore } from "@shared/providers/store-provider";

type TeamListProps = {
  initialMembers: UserProfile[];
};

const avatarColors: string[] = ["#206a5d", "#b85c38", "#4d5f8f", "#7d4f8f", "#2f7d54"];

const memberRoles: Array<{ value: Exclude<UserRole, "owner">; label: string }> = [
  { value: "manager", label: "Менеджер" },
  { value: "member", label: "Участник" }
];

const emptyMemberForm: CreateTeamMemberPayload = {
  name: "",
  email: "",
  role: "member",
  avatarColor: "#206a5d",
  position: ""
};

export const TeamList = observer(function TeamList({ initialMembers }: TeamListProps): JSX.Element {
  const { authStore, teamStore } = useRootStore();
  const visibleMembers = teamStore.members.length > 0 ? teamStore.members : initialMembers;
  const currentUser = authStore.user ?? visibleMembers.find((member) => member.role === "owner") ?? null;
  const canManageTeam = currentUser?.role === "owner";
  const [newMember, setNewMember] = useState<CreateTeamMemberPayload>(emptyMemberForm);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editMember, setEditMember] = useState<CreateTeamMemberPayload | null>(null);

  useEffect(() => {
    teamStore.hydrate(initialMembers);
    const owner = initialMembers.find((member) => member.role === "owner");

    if (owner) {
      authStore.hydrateProfile(owner);
    }

    void teamStore.loadTeam();
  }, [authStore, initialMembers, teamStore]);

  if (teamStore.status === "loading" && visibleMembers.length === 0) {
    return <p className="muted">Команда загружается...</p>;
  }

  async function handleCreateMember(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await teamStore.createMember(newMember);

    if (teamStore.error === null) {
      setNewMember(emptyMemberForm);
    }
  }

  function startEdit(member: UserProfile): void {
    if (member.role === "owner") {
      return;
    }

    setEditingMemberId(member.id);
    setEditMember({
      name: member.name,
      email: member.email,
      role: member.role,
      avatarColor: member.avatarColor,
      position: member.position
    });
  }

  function cancelEdit(): void {
    setEditingMemberId(null);
    setEditMember(null);
  }

  async function handleUpdateMember(event: React.FormEvent<HTMLFormElement>, memberId: string): Promise<void> {
    event.preventDefault();

    if (editMember === null) {
      return;
    }

    await teamStore.editMember(memberId, editMember);
    cancelEdit();
  }

  return (
    <div className="team-workspace">
      {canManageTeam ? (
        <form className="panel form team-form" onSubmit={handleCreateMember}>
          <h2>Добавить участника</h2>
          <div className="form-row">
            <label className="field">
              Имя
              <input className="input" value={newMember.name} onChange={(event) => setNewMember((form) => ({ ...form, name: event.target.value }))} required />
            </label>
            <label className="field">
              Email
              <input className="input" type="email" value={newMember.email} onChange={(event) => setNewMember((form) => ({ ...form, email: event.target.value }))} required />
            </label>
          </div>
          <div className="form-row">
            <label className="field">
              Должность
              <input className="input" value={newMember.position} onChange={(event) => setNewMember((form) => ({ ...form, position: event.target.value }))} required />
            </label>
            <label className="field">
              Роль
              <select
                className="input"
                value={newMember.role}
                onChange={(event) => setNewMember((form) => ({ ...form, role: event.target.value as Exclude<UserRole, "owner"> }))}
              >
                {memberRoles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <fieldset className="fieldset">
            <legend>Цвет аватара</legend>
            <div className="swatches">
              {avatarColors.map((color) => (
                <button
                  aria-label={`Выбрать цвет ${color}`}
                  className={color === newMember.avatarColor ? "swatch active" : "swatch"}
                  key={color}
                  onClick={() => setNewMember((form) => ({ ...form, avatarColor: color }))}
                  style={{ background: color }}
                  title={`Цвет ${color}`}
                  type="button"
                />
              ))}
            </div>
          </fieldset>
          {teamStore.error ? <p className="muted">{teamStore.error}</p> : null}
          {teamStore.saveMessage ? <p className="success-text">{teamStore.saveMessage}</p> : null}
          <button className="button primary" disabled={teamStore.saveStatus === "loading"} type="submit">
            {teamStore.saveStatus === "loading" ? "Сохранение..." : "Добавить в команду"}
          </button>
        </form>
      ) : null}

      <div className="cards">
        {visibleMembers.map((user) => (
          <article className="card" key={user.id}>
            {editingMemberId === user.id && editMember !== null ? (
              <form className="edit-task-form" onSubmit={(event) => void handleUpdateMember(event, user.id)}>
                <label className="field">
                  Имя
                  <input className="input" value={editMember.name} onChange={(event) => setEditMember((form) => (form === null ? form : { ...form, name: event.target.value }))} required />
                </label>
                <label className="field">
                  Email
                  <input
                    className="input"
                    type="email"
                    value={editMember.email}
                    onChange={(event) => setEditMember((form) => (form === null ? form : { ...form, email: event.target.value }))}
                    required
                  />
                </label>
                <label className="field">
                  Должность
                  <input
                    className="input"
                    value={editMember.position}
                    onChange={(event) => setEditMember((form) => (form === null ? form : { ...form, position: event.target.value }))}
                    required
                  />
                </label>
                <label className="field">
                  Роль
                  <select
                    className="input"
                    value={editMember.role}
                    onChange={(event) => setEditMember((form) => (form === null ? form : { ...form, role: event.target.value as Exclude<UserRole, "owner"> }))}
                  >
                    {memberRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="card-actions">
                  <button className="button primary" type="submit">
                    Сохранить
                  </button>
                  <button className="button" type="button" onClick={cancelEdit}>
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="badge" style={{ background: user.avatarColor, color: "#fff" }}>
                  {user.name.slice(0, 1)}
                </div>
                <h3>{user.name}</h3>
                <p className="muted">{user.email}</p>
                <p>{user.position}</p>
                <span className="badge">{user.role}</span>
                {canManageTeam && user.role !== "owner" ? (
                  <div className="card-actions">
                    <button className="button" type="button" onClick={() => startEdit(user)}>
                      Изменить
                    </button>
                    <button className="button danger" type="button" onClick={() => void teamStore.deleteMember(user.id)}>
                      Удалить
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
});
