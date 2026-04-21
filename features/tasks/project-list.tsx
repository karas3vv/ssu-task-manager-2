"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Project } from "@entities/project/model";
import { useRootStore } from "@shared/providers/store-provider";

type ProjectListProps = {
  initialProjects: Project[];
};

export const ProjectList = observer(function ProjectList({ initialProjects }: ProjectListProps): JSX.Element {
  const { projectStore } = useRootStore();
  const visibleProjects = projectStore.projects.length > 0 ? projectStore.projects : initialProjects;

  useEffect(() => {
    projectStore.hydrate(initialProjects);
    void projectStore.loadProjects();
  }, [initialProjects, projectStore]);

  if (projectStore.status === "loading" && visibleProjects.length === 0) {
    return <p className="muted">Проекты загружаются...</p>;
  }

  return (
    <div className="cards">
      {visibleProjects.map((project) => (
        <article className="card" key={project.id}>
          <span className="badge">{project.status}</span>
          <h3>{project.name}</h3>
          <p className="muted">{project.description}</p>
          <p>Дедлайн: {project.dueDate}</p>
        </article>
      ))}
    </div>
  );
});
