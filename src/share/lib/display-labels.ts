import type { ProjectStatus } from "@share/model/project";
import type { TaskPriority, TaskStatus } from "@share/model/task";
import type { UserRole } from "@share/model/user";
import { Locale } from "@share/config/i18n";
import { messages } from "@share/i18n/messages";

export const taskStatusLabels: Record<TaskStatus, string> = {
  todo: "К выполнению",
  inProgress: "В работе",
  review: "На проверке",
  done: "Готово"
};

export const taskPriorityLabels: Record<TaskPriority, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий"
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  active: "Активный",
  paused: "На паузе",
  completed: "Завершен"
};

export const userRoleLabels: Record<UserRole, string> = {
  owner: "Владелец",
  manager: "Менеджер",
  member: "Участник"
};

const positionLabels: Record<string, string> = {
  "Product manager": "Продуктовый менеджер",
  "Design lead": "Дизайн-лид",
  "Frontend developer": "Frontend-разработчик",
  "Workspace owner": "Владелец пространства"
};

export function getPositionLabel(position: string): string {
  return positionLabels[position] ?? position;
}

export function getTaskStatusLabels(locale: Locale): Record<TaskStatus, string> {
  return messages[locale].labels.taskStatus;
}

export function getTaskPriorityLabels(locale: Locale): Record<TaskPriority, string> {
  return messages[locale].labels.taskPriority;
}

export function getProjectStatusLabels(locale: Locale): Record<ProjectStatus, string> {
  return messages[locale].labels.projectStatus;
}

export function getUserRoleLabels(locale: Locale): Record<UserRole, string> {
  return messages[locale].labels.userRole;
}

export function getPositionLabelByLocale(position: string, locale: Locale): string {
  const positions: Record<string, string> = messages[locale].labels.positions;
  return positions[position] ?? getPositionLabel(position);
}
