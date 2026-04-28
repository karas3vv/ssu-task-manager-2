"use client";

import type * as React from "react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CreateProjectPayload, Project, ProjectStatus } from "@entities/project/model";
import { projectStatusLabels } from "@shared/lib/display-labels";
import { useRootStore } from "@shared/providers/store-provider";

type ProjectListProps = {
  initialProjects: Project[];
};

export const ProjectList = observer(function ProjectList({ initialProjects }: ProjectListProps): JSX.Element {
  const { projectStore } = useRootStore();
  const visibleProjects = projectStore.projects.length > 0 ? projectStore.projects : initialProjects;
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CreateProjectPayload | null>(null);
  const [form, setForm] = useState<CreateProjectPayload>({
    name: "",
    description: "",
    status: "active",
    dueDate: "2026-05-30"
  });

  useEffect(() => {
    projectStore.hydrate(initialProjects);
    void projectStore.loadProjects();
  }, [initialProjects, projectStore]);

  if (projectStore.status === "loading" && visibleProjects.length === 0) {
    return <p className="muted">Проекты загружаются...</p>;
  }

  async function handleCreateProject(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await projectStore.createProject(form);

    if (projectStore.error === null) {
      setForm((currentForm) => ({
        ...currentForm,
        name: "",
        description: ""
      }));
    }
  }

  function startEdit(project: Project): void {
    setEditingProjectId(project.id);
    setEditForm({
      name: project.name,
      description: project.description,
      status: project.status,
      dueDate: project.dueDate
    });
  }

  function cancelEdit(): void {
    setEditingProjectId(null);
    setEditForm(null);
  }

  async function handleUpdateProject(event: React.FormEvent<HTMLFormElement>, projectId: string): Promise<void> {
    event.preventDefault();

    if (editForm === null) {
      return;
    }

    await projectStore.updateProject(projectId, editForm);
    cancelEdit();
  }

  return (
    <div className="task-workspace">
      <form className="panel form task-form" onSubmit={handleCreateProject}>
        <h2>Новый проект</h2>
        <label className="field">
          Название
          <input
            className="input"
            value={form.name}
            onChange={(event) => setForm((currentForm) => ({ ...currentForm, name: event.target.value }))}
            placeholder="Например, запуск продукта"
            required
          />
        </label>
        <label className="field">
          Описание
          <textarea
            className="input textarea"
            value={form.description}
            onChange={(event) => setForm((currentForm) => ({ ...currentForm, description: event.target.value }))}
            placeholder="Что входит в проект"
            required
          />
        </label>
        <div className="form-row">
          <label className="field">
            Дедлайн
            <input
              className="input"
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, dueDate: event.target.value }))}
              required
            />
          </label>
          <label className="field">
            Статус
            <select
              className="input"
              value={form.status}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, status: event.target.value as ProjectStatus }))}
            >
              <option value="active">{projectStatusLabels.active}</option>
              <option value="paused">{projectStatusLabels.paused}</option>
              <option value="completed">{projectStatusLabels.completed}</option>
            </select>
          </label>
        </div>
        {projectStore.error ? <p className="muted">{projectStore.error}</p> : null}
        {projectStore.createMessage ? <p className="success-text">{projectStore.createMessage}</p> : null}
        <button className="button primary" disabled={projectStore.createStatus === "loading"} type="submit">
          {projectStore.createStatus === "loading" ? "Добавление..." : "Добавить проект"}
        </button>
      </form>

      <div className="cards">
        {visibleProjects.map((project) => (
          <article className="card" key={project.id}>
            {editingProjectId === project.id && editForm !== null ? (
              <form className="edit-task-form" onSubmit={(event) => void handleUpdateProject(event, project.id)}>
                <label className="field">
                  Название
                  <input
                    className="input"
                    value={editForm.name}
                    onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, name: event.target.value }))}
                    required
                  />
                </label>
                <label className="field">
                  Описание
                  <textarea
                    className="input textarea"
                    value={editForm.description}
                    onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, description: event.target.value }))}
                    required
                  />
                </label>
                <div className="form-row">
                  <label className="field">
                    Дедлайн
                    <input
                      className="input"
                      type="date"
                      value={editForm.dueDate}
                      onChange={(event) => setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, dueDate: event.target.value }))}
                      required
                    />
                  </label>
                  <label className="field">
                    Статус
                    <select
                      className="input"
                      value={editForm.status}
                      onChange={(event) =>
                        setEditForm((currentForm) => (currentForm === null ? currentForm : { ...currentForm, status: event.target.value as ProjectStatus }))
                      }
                    >
                      <option value="active">{projectStatusLabels.active}</option>
                      <option value="paused">{projectStatusLabels.paused}</option>
                      <option value="completed">{projectStatusLabels.completed}</option>
                    </select>
                  </label>
                </div>
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
                <span className="badge">{projectStatusLabels[project.status]}</span>
                <h3>{project.name}</h3>
                <p className="muted">{project.description}</p>
                <p>Дедлайн: {project.dueDate}</p>
                <div className="card-actions">
                  <button className="button" type="button" onClick={() => startEdit(project)}>
                    Изменить
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
