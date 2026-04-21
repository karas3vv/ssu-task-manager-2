import { Locale } from "@shared/config/i18n";

export type Messages = {
  metadata: {
    title: string;
    description: string;
  };
  common: {
    appName: string;
    signIn: string;
    signUp: string;
    logout: string;
    dashboard: string;
    tasks: string;
    projects: string;
    calendar: string;
    analytics: string;
    team: string;
    settings: string;
    profile: string;
    home: string;
    save: string;
    delete: string;
    edit: string;
  };
  landing: {
    title: string;
    subtitle: string;
    cta: string;
    secondary: string;
  };
  auth: {
    email: string;
    password: string;
    name: string;
    loginTitle: string;
    registerTitle: string;
  };
};

export const messages: Record<Locale, Messages> = {
  ru: {
    metadata: {
      title: "TaskFlow - менеджер задач",
      description: "TaskFlow помогает планировать задачи, проекты и работу команды."
    },
    common: {
      appName: "TaskFlow",
      signIn: "Войти",
      signUp: "Регистрация",
      logout: "Выйти",
      dashboard: "Кабинет",
      tasks: "Задачи",
      projects: "Проекты",
      calendar: "Календарь",
      analytics: "Аналитика",
      team: "Команда",
      settings: "Настройки",
      profile: "Профиль",
      home: "Главная",
      save: "Сохранить",
      delete: "Удалить",
      edit: "Изменить"
    },
    landing: {
      title: "TaskFlow",
      subtitle: "Планируйте задачи, фиксируйте прогресс и держите команду в одном рабочем ритме.",
      cta: "Зарегистрироваться",
      secondary: "Войти"
    },
    auth: {
      email: "Email",
      password: "Пароль",
      name: "Имя",
      loginTitle: "Вход в аккаунт",
      registerTitle: "Создание аккаунта"
    }
  },
  en: {
    metadata: {
      title: "TaskFlow - task manager",
      description: "TaskFlow helps plan tasks, projects and team work."
    },
    common: {
      appName: "TaskFlow",
      signIn: "Sign in",
      signUp: "Sign up",
      logout: "Log out",
      dashboard: "Dashboard",
      tasks: "Tasks",
      projects: "Projects",
      calendar: "Calendar",
      analytics: "Analytics",
      team: "Team",
      settings: "Settings",
      profile: "Profile",
      home: "Home",
      save: "Save",
      delete: "Delete",
      edit: "Edit"
    },
    landing: {
      title: "TaskFlow",
      subtitle: "Plan tasks, track progress and keep your team moving in one rhythm.",
      cta: "Create account",
      secondary: "Sign in"
    },
    auth: {
      email: "Email",
      password: "Password",
      name: "Name",
      loginTitle: "Account sign in",
      registerTitle: "Create account"
    }
  }
};
