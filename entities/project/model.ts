export type ProjectStatus = "active" | "paused" | "completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  dueDate: string;
};

export type CreateProjectPayload = Omit<Project, "id">;
export type UpdateProjectPayload = Partial<CreateProjectPayload>;
