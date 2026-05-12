"use client";

import type * as React from "react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CreateTaskPayload, Task, TaskPriority, TaskStatus } from "@share/model/task";
import { projects, users } from "@share/api/mock-db";
import { UserProfile } from "@share/model/user";
import { getTaskPriorityLabels, getTaskStatusLabels } from "@share/lib/display-labels";
import { Locale } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";
import { useRootStore } from "@share/providers/store-provider";

type TaskBoardProps = {
  initialTasks: Task[];
  locale: Locale;
};

export const TaskBoard = observer(function TaskBoard({ initialTasks, locale }: TaskBoardProps): JSX.Element {
  const { authStore, taskStore, teamStore } = useRootStore();
  const t = messages[locale];
  const taskPriorityLabels = getTaskPriorityLabels(locale);
  const taskStatusLabels = getTaskStatusLabels(locale);
  const visibleTasks = taskStore.tasks.length > 0 ? taskStore.tasks : initialTasks;
  const visibleUsers = mergeCurrentProfile(teamStore.members.length > 0 ? teamStore.members : users, authStore.user);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CreateTaskPayload | null>(null);
  const [form, setForm] = useState<CreateTaskPayload>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    projectId: projects[0]?.id ?? "project-1",
    assigneeId: users[0]?.id ?? "user-1",
    dueDate: "2026-04-30"
  });

  useEffect(() => {
    taskStore.hydrate(initialTasks);
    void taskStore.loadTasks();
    teamStore.hydrate(users);
    void teamStore.loadTeam();
  }, [initialTasks, taskStore, teamStore]);

  if (taskStore.status === "loading" && visibleTasks.length === 0) {
    return <p className="muted">{t.tasksBoard.loading}</p>;
  }

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await taskStore.createTask(form);

    if (taskStore.error === null) {
      setForm((currentForm) => ({
        ...currentForm,
        title: "",
        description: ""
      }));
    }
  }

  function startEdit(task: Task): void {
    setEditingTaskId(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      dueDate: task.dueDate
    });
  }

  function cancelEdit(): void {
    setEditingTaskId(null);
    setEditForm(null);
  }

  async function handleUpdateTask(event: React.FormEvent<HTMLFormElement>, taskId: string): Promise<void> {
    event.preventDefault();

    if (editForm === null) {
      return;
    }

    await taskStore.updateTask(taskId, editForm);
    cancelEdit();
  }

  return (
    <div className="task-workspace">
      <form className="panel form task-form" onSubmit={handleCreateTask}>
        <h2>{t.tasksBoard.newTask}</h2>
        <label className="field">
          {t.common.title}
          <input
            className="input"
            value={form.title}
            onChange={(event) => setForm((currentForm) => ({ ...currentForm, title: event.target.value }))}
            placeholder={t.tasksBoard.titlePlaceholder}
            required
          />
        </label>
        <label className="field">
          {t.common.description}
          <textarea
            className="input textarea"
            value={form.description}
            onChange={(event) => setForm((currentForm) => ({ ...currentForm, description: event.target.value }))}
            placeholder={t.tasksBoard.descriptionPlaceholder}
            required
          />
        </label>
        <div className="form-row">
          <label className="field">
            {t.common.deadline}
            <input
              className="input"
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, dueDate: event.target.value }))}
              required
            />
          </label>
          <label className="field">
            {t.common.priority}
            <select
              className="input"
              value={form.priority}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, priority: event.target.value as TaskPriority }))}
            >
              <option value="low">{taskPriorityLabels.low}</option>
              <option value="medium">{taskPriorityLabels.medium}</option>
              <option value="high">{taskPriorityLabels.high}</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label className="field">
            {t.common.project}
            <select
              className="input"
              value={form.projectId}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, projectId: event.target.value }))}
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            {t.common.assignee}
            <select
              className="input"
              value={form.assigneeId}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, assigneeId: event.target.value }))}
            >
              {visibleUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {taskStore.error ? <p className="muted">{taskStore.error}</p> : null}
        {taskStore.createMessage ? <p className="success-text">{taskStore.createMessage}</p> : null}
        <button className="button primary" disabled={taskStore.createStatus === "loading"} type="submit">
          {taskStore.createStatus === "loading" ? t.common.adding : t.tasksBoard.addTask}
        </button>
      </form>

      <div className="cards">
        {visibleTasks.map((task) => (
          <article className="card" key={task.id}>
            {editingTaskId === task.id && editForm !== null ? (
              <form className="edit-task-form" onSubmit={(event) => void handleUpdateTask(event, task.id)}>
                <label className="field">
                  {t.common.title}
                  <input
                    className="input"
                    value={editForm.title}
                    onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, title: event.target.value }))}
                    required
                  />
                </label>
                <label className="field">
                  {t.common.description}
                  <textarea
                    className="input textarea"
                    value={editForm.description}
                    onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, description: event.target.value }))}
                    required
                  />
                </label>
                <div className="form-row">
                  <label className="field">
                    {t.common.deadline}
                    <input
                      className="input"
                      type="date"
                      value={editForm.dueDate}
                      onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, dueDate: event.target.value }))}
                      required
                    />
                  </label>
                  <label className="field">
                    {t.common.priority}
                    <select
                      className="input"
                      value={editForm.priority}
                      onChange={(event) =>
                        setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, priority: event.target.value as TaskPriority }))
                      }
                    >
                      <option value="low">{taskPriorityLabels.low}</option>
                      <option value="medium">{taskPriorityLabels.medium}</option>
                      <option value="high">{taskPriorityLabels.high}</option>
                    </select>
                  </label>
                </div>
                <label className="field">
                  {t.common.status}
                  <select
                    className="input"
                    value={editForm.status}
                    onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, status: event.target.value as TaskStatus }))}
                  >
                    <option value="todo">{taskStatusLabels.todo}</option>
                    <option value="inProgress">{taskStatusLabels.inProgress}</option>
                    <option value="review">{taskStatusLabels.review}</option>
                    <option value="done">{taskStatusLabels.done}</option>
                  </select>
                </label>
                <div className="card-actions">
                  <button className="button primary" type="submit">
                    {t.common.save}
                  </button>
                  <button className="button" type="button" onClick={cancelEdit}>
                    {t.common.cancel}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span className="badge">{taskStatusLabels[task.status]}</span>
                <h3>{task.title}</h3>
                <p className="muted">{task.description}</p>
                <p>{t.tasksBoard.deadlinePrefix}: {task.dueDate}</p>
                <div className="card-actions">
                  <button className="button" type="button" onClick={() => void taskStore.toggleTask(task)}>
                    {task.status === "done" ? t.tasksBoard.returnToWork : t.common.done}
                  </button>
                  <button className="button" type="button" onClick={() => startEdit(task)}>
                    {t.common.edit}
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
});

function mergeCurrentProfile(usersList: UserProfile[], profile: UserProfile | null): UserProfile[] {
  if (profile === null) {
    return usersList;
  }

  const hasProfile = usersList.some((user) => user.id === profile.id);

  if (!hasProfile) {
    return [profile, ...usersList];
  }

  return usersList.map((user) => (user.id === profile.id ? profile : user));
}
