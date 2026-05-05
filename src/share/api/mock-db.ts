import { Project } from "@share/model/project";
import { Task } from "@share/model/task";
import { UserProfile } from "@share/model/user";

type MockDatabase = {
  demoUser: UserProfile;
  users: UserProfile[];
  projects: Project[];
  tasks: Task[];
};

declare global {
  var taskFlowMockDatabase: MockDatabase | undefined;
}

function createInitialDatabase(): MockDatabase {
  const demoUser: UserProfile = {
    id: "user-1",
    name: "Карас",
    email: "demo@taskflow.local",
    role: "owner",
    avatarColor: "#206a5d",
    position: "Продуктовый менеджер",
    workspaceName: "TaskFlow Space",
    notifications: {
      deadlineReminders: true,
      reviewUpdates: true,
      dailyDigest: false
    }
  };

  return {
    demoUser,
    users: [
      demoUser,
      {
        id: "user-2",
        name: "Анна",
        email: "anna@taskflow.local",
        role: "manager",
        avatarColor: "#b85c38",
        position: "Дизайн-лид",
        workspaceName: "TaskFlow Space",
        notifications: {
          deadlineReminders: true,
          reviewUpdates: false,
          dailyDigest: true
        }
      },
      {
        id: "user-3",
        name: "Илья",
        email: "ilya@taskflow.local",
        role: "member",
        avatarColor: "#4d5f8f",
        position: "Frontend-разработчик",
        workspaceName: "TaskFlow Space",
        notifications: {
          deadlineReminders: true,
          reviewUpdates: true,
          dailyDigest: true
        }
      }
    ],
    projects: [
      {
        id: "project-1",
        name: "Запуск MVP",
        description: "Подготовить минимальную версию task-manager к демонстрации.",
        status: "active",
        dueDate: "2026-05-12"
      },
      {
        id: "project-2",
        name: "Дизайн-система",
        description: "Собрать UI-паттерны, цвета, типографику и состояния компонентов.",
        status: "active",
        dueDate: "2026-05-28"
      },
      {
        id: "project-3",
        name: "Командный отчет",
        description: "Вывести метрики завершения задач и загрузки участников.",
        status: "paused",
        dueDate: "2026-06-10"
      }
    ],
    tasks: [
      {
        id: "task-1",
        title: "Сверстать лендинг",
        description: "SSR-страница с SEO, CTA и статистикой.",
        status: "done",
        priority: "high",
        projectId: "project-1",
        assigneeId: "user-1",
        dueDate: "2026-04-24"
      },
      {
        id: "task-2",
        title: "Настроить store",
        description: "Общий RootStore собирает auth, task, project и theme stores.",
        status: "review",
        priority: "high",
        projectId: "project-1",
        assigneeId: "user-1",
        dueDate: "2026-04-26"
      },
      {
        id: "task-3",
        title: "Добавить календарь",
        description: "Показать ближайшие задачи по дедлайнам.",
        status: "inProgress",
        priority: "medium",
        projectId: "project-2",
        assigneeId: "user-2",
        dueDate: "2026-04-29"
      },
      {
        id: "task-4",
        title: "Подготовить API методы",
        description: "GET, POST, PUT, PATCH, DELETE через axios-клиент.",
        status: "todo",
        priority: "medium",
        projectId: "project-3",
        assigneeId: "user-3",
        dueDate: "2026-05-02"
      }
    ]
  };
}

const database = globalThis.taskFlowMockDatabase ?? createInitialDatabase();
globalThis.taskFlowMockDatabase = database;

export const demoUser: UserProfile = database.demoUser;
export const users: UserProfile[] = database.users;
export const projects: Project[] = database.projects;
export const tasks: Task[] = database.tasks;

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}
