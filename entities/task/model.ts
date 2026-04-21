export type TaskStatus = "todo" | "inProgress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId: string;
  dueDate: string;
};

export type CreateTaskPayload = Omit<Task, "id">;
export type UpdateTaskPayload = Partial<CreateTaskPayload>;
