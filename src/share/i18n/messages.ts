import { Locale } from "@share/config/i18n";

const ru = {
  metadata: {
    title: "TaskFlow - менеджер задач",
    description: "TaskFlow помогает планировать задачи, проекты и работу команды.",
    loginTitle: "Авторизация",
    loginDescription: "Вход в личный кабинет TaskFlow.",
    registerTitle: "Регистрация",
    registerDescription: "Создание аккаунта TaskFlow.",
    dashboardTitle: "Личный кабинет",
    dashboardDescription: "Профиль пользователя и краткая сводка TaskFlow.",
    tasksTitle: "Задачи",
    tasksDescription: "CSR-доска задач с обновлением статусов.",
    projectsTitle: "Проекты",
    projectsDescription: "Список проектов task-manager.",
    calendarTitle: "Календарь",
    calendarDescription: "Календарь дедлайнов задач.",
    teamTitle: "Команда",
    teamDescription: "Участники команды TaskFlow."
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
    team: "Команда",
    profile: "Профиль",
    home: "Главная",
    save: "Сохранить",
    delete: "Удалить",
    edit: "Изменить",
    cancel: "Отмена",
    retry: "Повторить",
    loading: "Загрузка...",
    back: "Вернуться назад",
    pageNotFound: "Страница не найдена.",
    sectionNotFound: "Раздел не найден",
    deadline: "Дедлайн",
    title: "Название",
    description: "Описание",
    priority: "Приоритет",
    status: "Статус",
    role: "Роль",
    position: "Должность",
    workspace: "Рабочее пространство",
    name: "Имя",
    email: "Email",
    assignee: "Исполнитель",
    project: "Проект",
    saving: "Сохранение...",
    adding: "Добавление...",
    done: "Готово"
  },
  labels: {
    taskStatus: {
      todo: "К выполнению",
      inProgress: "В работе",
      review: "На проверке",
      done: "Готово"
    },
    taskPriority: {
      low: "Низкий",
      medium: "Средний",
      high: "Высокий"
    },
    projectStatus: {
      active: "Активный",
      paused: "На паузе",
      completed: "Завершен"
    },
    userRole: {
      owner: "Владелец",
      manager: "Менеджер",
      member: "Участник"
    },
    positions: {
      "Product manager": "Продуктовый менеджер",
      "Design lead": "Дизайн-лид",
      "Frontend developer": "Frontend-разработчик",
      "Workspace owner": "Владелец пространства"
    }
  },
  landing: {
    title: "TaskFlow",
    subtitle: "Планируйте задачи, фиксируйте прогресс и держите команду в одном рабочем ритме.",
    cta: "Зарегистрироваться",
    secondary: "Войти",
    previewLabel: "Превью рабочего процесса",
    preview: {
      plan: {
        badge: "План",
        title: "Соберите задачи",
        text: "Опишите работу, назначьте дедлайн и приоритет."
      },
      focus: {
        badge: "Фокус",
        title: "Видите неделю",
        text: "Календарь показывает, что важно сегодня и что приближается."
      },
      team: {
        badge: "Команда",
        title: "Двигайтесь вместе",
        text: "Профили, проекты и задачи остаются в одном рабочем пространстве."
      }
    }
  },
  auth: {
    email: "Email",
    password: "Пароль",
    name: "Имя",
    loginTitle: "Вход в аккаунт",
    registerTitle: "Создание аккаунта",
    retryLogin: "Повторить вход",
    retryRegister: "Повторить регистрацию",
    loginError: "Ошибка входа",
    registerError: "Ошибка регистрации"
  },
  profile: {
    editTitle: "Редактирование профиля",
    avatarColor: "Цвет аватара",
    chooseColor: "Выбрать цвет",
    color: "Цвет",
    notifications: "Уведомления",
    deadlineReminders: "Напоминать о дедлайнах",
    reviewUpdates: "Сообщать о задачах на ревью",
    dailyDigest: "Присылать ежедневную сводку",
    saveProfile: "Сохранить профиль",
    statsTasks: "Задач",
    statsProjects: "Проектов",
    statsDone: "Готово",
    statsDigest: "Сводка",
    loading: "Загрузка профиля...",
    error: "Ошибка профиля",
    notFound: "Профиль не найден"
  },
  tasksBoard: {
    loading: "Задачи загружаются...",
    newTask: "Новая задача",
    titlePlaceholder: "Например, подготовить отчет",
    descriptionPlaceholder: "Что нужно сделать",
    addTask: "Добавить задачу",
    returnToWork: "Вернуть в работу",
    deadlinePrefix: "Дедлайн"
  },
  projectsBoard: {
    loading: "Проекты загружаются...",
    newProject: "Новый проект",
    titlePlaceholder: "Например, запуск продукта",
    descriptionPlaceholder: "Что входит в проект",
    addProject: "Добавить проект",
    deadlinePrefix: "Дедлайн"
  },
  teamBoard: {
    loading: "Команда загружается...",
    addMember: "Добавить участника",
    addToTeam: "Добавить в команду",
    description: "Список участников синхронизируется с обновленным профилем через store и API.",
    loadingPage: "Загрузка команды...",
    error: "Ошибка команды",
    notFound: "Команда не найдена"
  },
  calendarBoard: {
    boardLabel: "Календарь задач",
    prioritySuffix: "приоритет",
    noDeadlines: "Нет дедлайнов",
    today: "Сегодня",
    todayText: "задач с дедлайном на сегодня",
    planned: "В плане",
    plannedText: "дедлайнов в ближайшие 14 дней",
    overdue: "Просрочено",
    overdueText: "незавершенных задач раньше сегодняшней даты",
    nextFocus: "Следующий фокус",
    noActiveDeadlines: "Нет активных дедлайнов.",
    pageDescription: "План на ближайшие две недели: дедлайны, приоритеты и быстрый фокус на следующей задаче.",
    loading: "Загрузка календаря...",
    error: "Ошибка календаря",
    notFound: "Календарь не найден"
  },
  theme: {
    title: "Сменить тему"
  },
  pages: {
    publicErrorTitle: "Ошибка",
    publicErrorText: "Не удалось загрузить страницу.",
    dashboardErrorTitle: "Критическая ошибка",
    dashboardErrorText: "Не удалось загрузить кабинет.",
    dashboardLoading: "Загрузка кабинета...",
    dashboardSectionNotFound: "Раздел не найден",
    publicLoading: "Загрузка...",
    projectsLoading: "Загрузка проектов...",
    projectsError: "Ошибка проектов",
    projectsNotFound: "Проекты не найдены",
    tasksLoading: "Загрузка задач...",
    tasksError: "Ошибка задач",
    tasksNotFound: "Задачи не найдены"
  },
  language: {
    switch: "Сменить язык"
  }
};

export type Messages = typeof ru;

const en: Messages = {
  metadata: {
    title: "TaskFlow - task manager",
    description: "TaskFlow helps plan tasks, projects and team work.",
    loginTitle: "Authorization",
    loginDescription: "Sign in to your TaskFlow account.",
    registerTitle: "Registration",
    registerDescription: "Create a TaskFlow account.",
    dashboardTitle: "Dashboard",
    dashboardDescription: "User profile and TaskFlow summary.",
    tasksTitle: "Tasks",
    tasksDescription: "CSR task board with status updates.",
    projectsTitle: "Projects",
    projectsDescription: "Task manager project list.",
    calendarTitle: "Calendar",
    calendarDescription: "Task deadline calendar.",
    teamTitle: "Team",
    teamDescription: "TaskFlow team members."
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
    team: "Team",
    profile: "Profile",
    home: "Home",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    retry: "Retry",
    loading: "Loading...",
    back: "Go back",
    pageNotFound: "Page not found.",
    sectionNotFound: "Section not found",
    deadline: "Deadline",
    title: "Title",
    description: "Description",
    priority: "Priority",
    status: "Status",
    role: "Role",
    position: "Position",
    workspace: "Workspace",
    name: "Name",
    email: "Email",
    assignee: "Assignee",
    project: "Project",
    saving: "Saving...",
    adding: "Adding...",
    done: "Done"
  },
  labels: {
    taskStatus: {
      todo: "To do",
      inProgress: "In progress",
      review: "In review",
      done: "Done"
    },
    taskPriority: {
      low: "Low",
      medium: "Medium",
      high: "High"
    },
    projectStatus: {
      active: "Active",
      paused: "Paused",
      completed: "Completed"
    },
    userRole: {
      owner: "Owner",
      manager: "Manager",
      member: "Member"
    },
    positions: {
      "Product manager": "Product manager",
      "Design lead": "Design lead",
      "Frontend developer": "Frontend developer",
      "Workspace owner": "Workspace owner"
    }
  },
  landing: {
    title: "TaskFlow",
    subtitle: "Plan tasks, track progress and keep your team moving in one rhythm.",
    cta: "Create account",
    secondary: "Sign in",
    previewLabel: "Workflow preview",
    preview: {
      plan: {
        badge: "Plan",
        title: "Collect tasks",
        text: "Describe the work, assign a deadline and set priority."
      },
      focus: {
        badge: "Focus",
        title: "See the week",
        text: "The calendar shows what matters today and what is coming next."
      },
      team: {
        badge: "Team",
        title: "Move together",
        text: "Profiles, projects and tasks stay in one workspace."
      }
    }
  },
  auth: {
    email: "Email",
    password: "Password",
    name: "Name",
    loginTitle: "Account sign in",
    registerTitle: "Create account",
    retryLogin: "Retry sign in",
    retryRegister: "Retry registration",
    loginError: "Sign in error",
    registerError: "Registration error"
  },
  profile: {
    editTitle: "Edit profile",
    avatarColor: "Avatar color",
    chooseColor: "Choose color",
    color: "Color",
    notifications: "Notifications",
    deadlineReminders: "Remind me about deadlines",
    reviewUpdates: "Notify me about review tasks",
    dailyDigest: "Send a daily digest",
    saveProfile: "Save profile",
    statsTasks: "Tasks",
    statsProjects: "Projects",
    statsDone: "Done",
    statsDigest: "Digest",
    loading: "Loading profile...",
    error: "Profile error",
    notFound: "Profile not found"
  },
  tasksBoard: {
    loading: "Tasks are loading...",
    newTask: "New task",
    titlePlaceholder: "For example, prepare a report",
    descriptionPlaceholder: "What needs to be done",
    addTask: "Add task",
    returnToWork: "Return to work",
    deadlinePrefix: "Deadline"
  },
  projectsBoard: {
    loading: "Projects are loading...",
    newProject: "New project",
    titlePlaceholder: "For example, product launch",
    descriptionPlaceholder: "What is included in the project",
    addProject: "Add project",
    deadlinePrefix: "Deadline"
  },
  teamBoard: {
    loading: "Team is loading...",
    addMember: "Add member",
    addToTeam: "Add to team",
    description: "The member list syncs with the updated profile through the store and API.",
    loadingPage: "Loading team...",
    error: "Team error",
    notFound: "Team not found"
  },
  calendarBoard: {
    boardLabel: "Task calendar",
    prioritySuffix: "priority",
    noDeadlines: "No deadlines",
    today: "Today",
    todayText: "tasks due today",
    planned: "Planned",
    plannedText: "deadlines in the next 14 days",
    overdue: "Overdue",
    overdueText: "unfinished tasks before today",
    nextFocus: "Next focus",
    noActiveDeadlines: "No active deadlines.",
    pageDescription: "Plan for the next two weeks: deadlines, priorities and quick focus on the next task.",
    loading: "Loading calendar...",
    error: "Calendar error",
    notFound: "Calendar not found"
  },
  theme: {
    title: "Switch theme"
  },
  pages: {
    publicErrorTitle: "Error",
    publicErrorText: "Failed to load the page.",
    dashboardErrorTitle: "Critical error",
    dashboardErrorText: "Failed to load the dashboard.",
    dashboardLoading: "Loading dashboard...",
    dashboardSectionNotFound: "Section not found",
    publicLoading: "Loading...",
    projectsLoading: "Loading projects...",
    projectsError: "Projects error",
    projectsNotFound: "Projects not found",
    tasksLoading: "Loading tasks...",
    tasksError: "Tasks error",
    tasksNotFound: "Tasks not found"
  },
  language: {
    switch: "Switch language"
  }
};

export const messages: Record<Locale, Messages> = {
  ru,
  en
};
